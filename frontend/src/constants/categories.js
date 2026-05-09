export const CATEGORY_CONFIG = {
  all: {
    id: "all",
    dbName: "all",
    label: "All",
    emoji: "✨",
    color: "bg-gray-800 text-white",
    light: "bg-gray-100 text-gray-700",
  },
  1: {
    id: 1,
    dbName: "funny",
    label: "Funny",
    emoji: "😂",
    color: "bg-yellow-400 text-yellow-900",
    light: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  },
  2: {
    id: 2,
    dbName: "learn",
    label: "Learn & Feel Good",
    emoji: "📚",
    color: "bg-blue-500 text-white",
    light: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  3: {
    id: 3,
    dbName: "heartwarming",
    label: "Heartwarming",
    emoji: "❤️",
    color: "bg-rose-400 text-white",
    light: "bg-rose-50 text-rose-700 border border-rose-200",
  },
  4: {
    id: 4,
    dbName: "good news",
    label: "Good News",
    emoji: "📰",
    color: "bg-emerald-500 text-white",
    light: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};

const CATEGORY_NAME_TO_ID = {
  funny: 1,
  learn: 2,
  heartwarming: 3,
  "good news": 4,
  good_news: 4,
};

export const FEED_CATEGORIES = [
  CATEGORY_CONFIG.all,
  CATEGORY_CONFIG[1],
  CATEGORY_CONFIG[2],
  CATEGORY_CONFIG[3],
  CATEGORY_CONFIG[4],
];

export function resolveCategoryId(post) {
  if (post?.category_id != null) return Number(post.category_id);
  if (typeof post?.category === "number") return Number(post.category);
  const byName =
    post?.category_name || post?.category || post?.name || post?.categoryName;
  if (typeof byName === "string") {
    return CATEGORY_NAME_TO_ID[byName.trim().toLowerCase()] || 4;
  }
  return 4;
}
