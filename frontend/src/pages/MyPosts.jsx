import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { postsApi } from "../lib/api";
import { resolveCategoryId } from "../constants/categories";

export default function MyPosts({ user, navigate }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMine = async () => {
      try {
        const data = await postsApi.listMine(user.token);
        setPosts(
          data.map((item) => ({
            ...item,
            category_id: resolveCategoryId(item),
            username: user.username,
            heart_count: item.hearts_count ?? item.heart_count ?? 0,
          }))
        );
      } catch (e) {
        setError(e.message || "Could not load your posts.");
      } finally {
        setLoading(false);
      }
    };
    loadMine();
  }, [user.token, user.username]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await postsApi.remove(user.token, id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError(e.message || "Could not delete post.");
    }
  };

  const handleHeart = async (postId) => {
    try {
      const data = await postsApi.toggleHeart(user.token, postId);
      setPosts((prev) =>
        prev.map((item) =>
          item.id === postId
            ? {
                ...item,
                heart_count: Number(data.heartsCount),
                hearts_count: Number(data.heartsCount),
                hearted_by_me: !!data.hearted,
              }
            : item
        )
      );
      return data;
    } catch (e) {
      setError(e.message || "Could not update heart.");
      throw e;
    }
  };

  const totalHearts = posts.reduce((sum, p) => sum + p.heart_count, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 page-fade">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl text-gray-800 mb-1">My Posts</h1>
        <p className="text-sm text-gray-400">
          Your happy moments, shared in your space. ❤️ {totalHearts} total
          hearts received.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-3xl font-display text-gray-800 mb-1">
            {posts.length}
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Posts Shared
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-3xl font-display text-rose-500 mb-1">
            {totalHearts}
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Hearts Received
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading your posts...</div>
      ) : error ? (
        <div className="text-center py-16 text-rose-500 text-sm">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-sm">You haven't shared any moments yet.</p>
          <button
            onClick={() => navigate("home")}
            className="mt-4 px-5 py-2 bg-gray-800 text-white text-sm rounded-xl hover:bg-gray-700 transition-colors"
          >
            Share your first moment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="relative">
              <PostCard
                post={post}
                currentUser={user}
                onHeart={handleHeart}
                showHeartCount={true}
              />
              {/* Delete button */}
              <button
                onClick={() => handleDelete(post.id)}
                className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-white/95 border border-rose-200 text-rose-600 text-xs font-semibold shadow-sm hover:bg-rose-50 transition-colors"
                title="Delete post"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
