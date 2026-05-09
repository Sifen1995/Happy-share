import { useState } from "react";
import { FEED_CATEGORIES } from "../constants/categories";

export default function PostForm({ onSubmit, onClose }) {
  const MAX_MEDIA_SIZE_BYTES = 100 * 1024 * 1024;
  const [text, setText] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [link, setLink] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return setError("Post text is required.");
    if (!categoryId) return setError("Please select a category.");
    const selectedCategory = FEED_CATEGORIES.find(
      (item) => Number(item.id) === Number(categoryId),
    );
    const categoryName = selectedCategory?.dbName || selectedCategory?.label;
    if (!categoryName) return setError("Please select a valid category.");
    setLoading(true);
    setError("");
    try {
      await onSubmit({
        text: text.trim(),
        category: categoryName,
        link: link.trim(),
        mediaFile,
      });
    } catch (err) {
      setError(err.message || "Could not publish this post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-gray-100 shadow-xl p-6 page-fade"
      >
        <h2 className="font-display text-2xl text-gray-800 mb-1">
          Share a Happy Moment
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Keep it short, kind, and uplifting.
        </p>

        {error && (
          <div className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-100 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={280}
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          placeholder="What made you smile today?"
        />

        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          {FEED_CATEGORIES.filter((item) => item.id !== "all").map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>

        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Link (optional, used when no video is uploaded)
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          placeholder="https://example.com"
        />

        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Image or Video (optional)
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            if (file && file.size > MAX_MEDIA_SIZE_BYTES) {
              setError("File too large. Please upload a file smaller than 100MB.");
              e.target.value = "";
              setMediaFile(null);
              return;
            }
            setError("");
            setMediaFile(file);
          }}
          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-800 mb-6"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
