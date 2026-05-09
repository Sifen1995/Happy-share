import { useState, useEffect } from "react";

export default function Navbar({
  user,
  page,
  navigate,
  onLogout,
  sessionStart,
}) {
  const [minutes, setMinutes] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStart) / 60000);
      setMinutes(elapsed);
    }, 30000);
    return () => clearInterval(interval);
  }, [sessionStart]);

  const timerColor =
    minutes >= 8
      ? "text-rose-500"
      : minutes >= 5
        ? "text-amber-500"
        : "text-emerald-600";

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          className="font-display text-xl text-gray-800 hover:text-emerald-700 transition-colors"
        >
          HappyShare
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1 text-sm">
          <button
            onClick={() => navigate("home")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              page === "home"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            My Feed
          </button>
          <button
            onClick={() => navigate("my-posts")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              page === "my-posts"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            My Posts
          </button>

          {/* Done for today */}
          <button
            onClick={() => navigate("done")}
            className="px-3 py-1.5 rounded-lg font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            Done for Today
          </button>
        </div>

        {/* Right side: timer + avatar */}
        <div className="flex items-center gap-3">
          {/* Session timer */}
          <div
            className={`text-xs font-medium flex items-center gap-1 ${timerColor}`}
          >
            <span>⏱</span>
            <span>{minutes}m</span>
          </div>

          {/* User avatar dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center hover:bg-emerald-200 transition-colors"
            >
              {user?.username?.slice(0, 2).toUpperCase() || "ME"}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-50">
                  {user?.username}
                </div>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("my-posts");
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  My Posts
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
