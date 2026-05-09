import { useState, useEffect } from "react";
import {
  FEED_CATEGORIES,
  resolveCategoryId,
} from "../constants/categories";
import PostCard from "../components/PostCard";
import FeelingLowOverlay from "../components/FeelingLowOverlay";
import HappyLimitOverlay from "../components/HappyLimitOverlay";
import PostForm from "../components/PostForm";
import { postsApi } from "../lib/api";

const HAPPY_LIMIT_MS = 10 * 60 * 1000; // 10 minutes

export default function HomeFeed({
  user,
  navigate,
  categoryFilter,
  setCategoryFilter,
  sessionStart,
}) {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [feedError, setFeedError] = useState("");
  const [showFeelingLow, setShowFeelingLow] = useState(false);
  const [feelingLowText, setFeelingLowText] = useState("");
  const [showHappyLimit, setShowHappyLimit] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [happyLimitDismissed, setHappyLimitDismissed] = useState(false);

  // Happy limit timer
  useEffect(() => {
    if (happyLimitDismissed) return;
    const remaining = HAPPY_LIMIT_MS - (Date.now() - sessionStart);
    if (remaining <= 0) {
      setShowHappyLimit(true);
      return;
    }
    const timer = setTimeout(() => setShowHappyLimit(true), remaining);
    return () => clearTimeout(timer);
  }, [sessionStart, happyLimitDismissed]);

  useEffect(() => {
    loadFeed(1, true);
  }, []);

  const loadFeed = async (nextPage, replace = false) => {
    setLoadingFeed(true);
    setFeedError("");
    try {
      const data = await postsApi.list(nextPage);
      const normalized = (data.items || []).map((p) => ({
        ...p,
        category_id: resolveCategoryId(p),
        heart_count: p.hearts_count ?? 0,
      }));
      setPosts((prev) => (replace ? normalized : [...prev, ...normalized]));
      setPageNumber(nextPage);
      setHasMore(normalized.length === 10);
    } catch (error) {
      setFeedError(error.message || "Could not load feed.");
    } finally {
      setLoadingFeed(false);
    }
  };

  const filtered =
    categoryFilter === "all"
      ? posts
      : posts.filter((p) => Number(p.category_id) === Number(categoryFilter));

  const handleNewPost = async (payload) => {
    const created = await postsApi.create(user.token, payload);
    setPosts((prev) => [
      {
        ...created,
        category_id: resolveCategoryId(created),
        username: user.username,
        heart_count: 0,
        hearted_by_me: false,
      },
      ...prev,
    ]);
    setShowPostForm(false);
  };

  const handleHeart = async (postId) => {
    const data = await postsApi.toggleHeart(user.token, postId);
    setPosts((prev) =>
      prev.map((item) =>
        item.id === postId
          ? {
              ...item,
              heart_count: data.heartsCount,
              hearted_by_me: data.hearted,
            }
          : item
      )
    );
    return data;
  };

  const openFeelingLow = async () => {
    setShowFeelingLow(true);
    try {
      const post = await postsApi.random();
      setFeelingLowText(post.text);
    } catch (_error) {
      setFeelingLowText("You are not behind. You are building your own rhythm.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 page-fade">
      {/* Overlays */}
      {showFeelingLow && (
        <FeelingLowOverlay
          quote={feelingLowText}
          onClose={() => setShowFeelingLow(false)}
          onTryAnother={async () => {
            const post = await postsApi.random();
            setFeelingLowText(post.text);
          }}
        />
      )}
      {showHappyLimit && !happyLimitDismissed && (
        <HappyLimitOverlay
          onDismiss={() => {
            setHappyLimitDismissed(true);
            setShowHappyLimit(false);
          }}
          onDoneForToday={() => navigate("done")}
        />
      )}
      {showPostForm && (
        <PostForm
          onSubmit={handleNewPost}
          onClose={() => setShowPostForm(false)}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar: categories */}
        <aside className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-2 mb-3">
            Categories
          </p>
          {FEED_CATEGORIES.map((c) => (
            <button
              key={String(c.id)}
              onClick={() => setCategoryFilter(c.id)}
              className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                String(categoryFilter) === String(c.id)
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          ))}

          {/* Daily Balance card */}
          <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs text-emerald-700 leading-relaxed">
            <p className="font-semibold mb-1">Daily Balance</p>
            <p>
              You've visited 5 nurturing spaces today. Taking intentional breaks
              helps you maintain clarity.
            </p>
          </div>
        </aside>

        {/* Main feed */}
        <main>
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">{posts.length} posts loaded</span>
              <span className="text-xs font-medium bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
                It's a Happy Moment!
              </span>
              {user && (
                <span className="text-xs text-gray-400">Done for: Today</span>
              )}
            </div>
            {user && (
              <button
                onClick={() => setShowPostForm(true)}
                className="px-4 py-2 bg-gray-800 text-white text-xs font-semibold rounded-xl hover:bg-gray-700 transition-colors"
              >
                + Share moment
              </button>
            )}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {feedError ? (
              <div className="text-center py-16 text-rose-500 text-sm">{feedError}</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-sm">
                No posts in this category yet. Be the first to share! 🌟
              </div>
            ) : (
              filtered.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={user}
                  onHeart={handleHeart}
                  showHeartCount={true}
                />
              ))
            )}
          </div>

          {/* Load more */}
          {hasMore && !feedError ? (
            <button
              onClick={() => loadFeed(pageNumber + 1)}
              disabled={loadingFeed}
              className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              {loadingFeed ? "Loading..." : "Load more happy moments"}
            </button>
          ) : filtered.length > 0 && !loadingFeed ? (
            <div className="text-center mt-8 py-6 text-sm text-gray-400">
              <p>🌿 You're all caught up with the joy.</p>
              <button
                onClick={() => setCategoryFilter("all")}
                className="mt-2 text-emerald-600 hover:text-emerald-800 text-xs underline"
              >
                Load more moments
              </button>
            </div>
          ) : null}
        </main>
      </div>

      {/* Floating Feeling Low button */}
      <button
        onClick={openFeelingLow}
        className="fixed bottom-6 right-6 bg-gray-800 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all z-30"
      >
        I'm Feeling Low
      </button>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-12 py-6">
        <div className="max-w-3xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>
            <span className="font-medium text-gray-600">HappyShare</span>
            <span className="ml-2">Nurturing your digital space.</span>
          </div>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Safety Guide</span>
            <span>© 2024 HappyShare</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
