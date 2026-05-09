import { useEffect, useState } from "react";
import { CATEGORY_CONFIG, resolveCategoryId } from "../constants/categories";
import { timeAgo } from "../utils/timeAgo";

export default function PostCard({
  post,
  currentUser,
  onHeart,
  showHeartCount = false,
}) {
  const [hearted, setHearted] = useState(Boolean(post.hearted_by_me));

  const [heartCount, setHeartCount] = useState(Number(post.hearts_count ?? 0));

  const [isUpdatingHeart, setIsUpdatingHeart] = useState(false);

  // backend returns category string
  const resolvedCategoryId = resolveCategoryId({
    category: post.category,
  });

  const cat = CATEGORY_CONFIG[resolvedCategoryId] || CATEGORY_CONFIG[4];

  const resolveUrl = (value) => {
    if (typeof value !== "string") return null;

    const cleaned = value.trim().replace(/^["']|["']$/g, "");

    if (!cleaned) return null;

    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
      return cleaned;
    }

    return `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/${cleaned
      .replace(/^\/+/, "")
      .replace(/\\/g, "/")}`;
  };

  const imageSrc = resolveUrl(post.image_url);

  const linkSrc = resolveUrl(post.link);
  const isVideoLink =
    typeof linkSrc === "string" &&
    /(\/video\/upload\/|\.mp4(\?|$)|\.mov(\?|$)|\.webm(\?|$)|\.m4v(\?|$))/i.test(
      linkSrc,
    );

  const isVideoUrl = (url) => {
    if (!url) return false;
    return (
      /res\.cloudinary\.com\/.+\/video\/upload/i.test(url) ||
      /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)
    );
  };

  const cloudinaryImageFromLink =
    !imageSrc && linkSrc && /res\.cloudinary\.com/i.test(linkSrc) && !isVideoLink
      ? linkSrc
      : null;

  const finalImageSrc = imageSrc || cloudinaryImageFromLink;
  const finalVideoSrc = !finalImageSrc && isVideoUrl(linkSrc) ? linkSrc : null;

  useEffect(() => {
    setHearted(Boolean(post.hearted_by_me));

    setHeartCount(Number(post.hearts_count ?? 0));
  }, [post.hearted_by_me, post.hearts_count]);

  const handleHeart = async () => {
    if (!currentUser) {
      alert("Sign in to heart posts 💛");
      return;
    }

    if (isUpdatingHeart) return;

    setIsUpdatingHeart(true);

    const nextHearted = !hearted;

    // optimistic update
    setHearted(nextHearted);

    setHeartCount((prev) => (nextHearted ? prev + 1 : prev - 1));

    try {
      if (onHeart) {
        const result = await onHeart(post.id);

        if (typeof result?.hearted === "boolean") {
          setHearted(result.hearted);
        }

        if (typeof result?.heartsCount === "number") {
          setHeartCount(result.heartsCount);
        }
      }
    } catch (error) {
      // rollback
      setHearted(!nextHearted);

      setHeartCount((prev) => (nextHearted ? prev - 1 : prev + 1));
    } finally {
      setIsUpdatingHeart(false);
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {post.avatar || post.username?.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {post.username}
            </p>

            <p className="text-xs text-gray-400">{timeAgo(post.created_at)}</p>
          </div>
        </div>

        {/* Category */}
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${cat.light}`}
        >
          {cat.emoji} {cat.label}
        </span>
      </div>

      {/* Text */}
      <p className="px-5 pb-3 text-sm text-gray-700 leading-relaxed">
        {post.text}
      </p>

      {/* Image */}
      {finalImageSrc && (
        <div className="px-5 pb-3">
          <img
            src={finalImageSrc}
            alt="Post"
            className="w-full h-56 object-cover rounded-xl"
            loading="lazy"
          />
        </div>
      )}

      {/* Video */}
      {isVideoLink && (
        <div className="px-5 pb-3">
          <video
            src={linkSrc}
            className="w-full h-56 object-cover rounded-xl bg-black"
            controls
            loop
            muted
            playsInline
          />
        </div>
      )}

      {/* Link */}
      {linkSrc && !cloudinaryImageFromLink && !isVideoLink && (
        <div className="px-5 pb-3">
          <a
            href={linkSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>🔗</span>
            <span>View link</span>
          </a>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-50 flex items-center gap-4">
        <button
          onClick={handleHeart}
          disabled={isUpdatingHeart}
          className={`flex items-center gap-1.5 text-sm transition-all ${
            hearted ? "text-rose-500" : "text-gray-400 hover:text-rose-400"
          } ${isUpdatingHeart ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <span
            className={`text-lg transition-transform ${
              hearted ? "scale-110" : ""
            }`}
          >
            {hearted ? "❤️" : "🤍"}
          </span>

          <span className="font-medium">{heartCount}</span>
        </button>

        {showHeartCount && (
          <span className="text-xs text-gray-400">
            {heartCount} hearts received
          </span>
        )}
      </div>
    </article>
  );
}
