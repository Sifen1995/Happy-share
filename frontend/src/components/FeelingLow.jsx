import { useState } from "react";
import { postsApi } from "../lib/api";

export default function FeelingLow() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const fetchBoostPosts = async () => {
    setLoading(true);
    setError("");
    try {
      try {
        const data = await postsApi.feelingLow(20);
        setPosts(data.items || []);
      } catch (_routeError) {
        // Backward compatibility: if /feeling-low is unavailable, fallback to random.
        const single = await postsApi.random();
        setPosts(single ? [single] : []);
      }
      setOpen(true);
    } catch (fetchError) {
      setError(fetchError.message || "Could not fetch a mood boost right now.");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={fetchBoostPosts}
        disabled={loading}
        className="fixed bottom-6 right-6 bg-gray-800 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all z-30 disabled:opacity-70"
      >
        {loading ? "Finding a smile for you..." : "Feeling Low?"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h2 className="font-display text-2xl text-gray-800">Instant Mood Boost</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            {error ? (
              <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3">
                {error}
              </div>
            ) : posts.length === 0 ? (
              <p className="text-sm text-gray-500">No mood-boost posts available yet.</p>
            ) : (
              <div className="max-h-[65vh] overflow-y-auto space-y-4 pr-1">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                  >
                    {post.link ? (
                      <video
                        src={post.link}
                        className="w-full rounded-xl mb-3 max-h-72 object-cover bg-black"
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                      />
                    ) : post.image_url ? (
                      <img
                        src={post.image_url}
                        alt="Mood boost"
                        className="w-full rounded-xl mb-3 max-h-72 object-cover"
                      />
                    ) : null}

                    <blockquote className="text-gray-700 text-sm leading-relaxed border-l-2 border-emerald-300 pl-3 mb-2">
                      {post.text}
                    </blockquote>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Shared by @{post.username}</span>
                      <span>{post.hearts_count || 0} hearts</span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={fetchBoostPosts}
                disabled={loading}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-70"
              >
                {loading ? "Finding a smile for you..." : "Boost Me Again"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
