export default function DoneForToday({ navigate, sessionStart }) {
  const minutesSpent = Math.max(
    1,
    Math.floor((Date.now() - sessionStart) / 60000),
  );
  const postsShared = parseInt(
    sessionStorage.getItem("hs_posts_shared") || "3",
  );
  const postsDiscovered = parseInt(
    sessionStorage.getItem("hs_posts_discovered") || "12",
  );

  const quotes = [
    '"Nice work. You used your time well today."',
    '"Small good moments add up. See you tomorrow."',
    '"You took care of your space today. Come back when you are ready."',
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 page-fade">
      {/* Top bar */}
      <div className="fixed top-4 right-4 text-xs text-gray-400">
        Done for Today
      </div>

      <div className="max-w-md w-full text-center bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto mb-6">
          😊
        </div>

        <h1 className="font-display text-3xl text-gray-800 mb-3 leading-tight">
          You are done for today
        </h1>
        <p className="text-sm text-gray-500 mb-10 leading-relaxed">
          Take a short break and come back fresh tomorrow.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-3xl font-display text-gray-800 mb-1">
              {postsShared}
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Posts Shared
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-3xl font-display text-gray-800 mb-1">
              {postsDiscovered}
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Moments Discovered
            </p>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-sm text-gray-600 italic mb-8 leading-relaxed">
          {quote}
        </blockquote>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("landing")}
            className="flex-1 py-3 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Close App
          </button>
          <button
            onClick={() => navigate("home")}
            className="flex-1 py-3 border border-gray-200 bg-white text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Session summary */}
        <p className="text-xs text-gray-400 mt-5">
          🌿 Session Summary: {minutesSpent} minutes of nurturing
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-gray-400 text-center">
        <span className="font-medium text-gray-500">HappyShare</span>
        <span className="mx-2">·</span>
        <span>Nurturing your digital space.</span>
        <div className="flex justify-center gap-4 mt-2">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Safety Guide</span>
        </div>
      </div>
    </div>
  );
}
