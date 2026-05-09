export default function LandingPage({ navigate, user }) {
  const principles = [
    { icon: "⊘", title: "No Infinite Scroll", desc: "Conscious breaks are built into our design. Experience natural stop points that encourage you to return to the physical world." },
    { icon: "👁", title: "No Public Metrics", desc: "Share for yourself, not for the likes. We've removed public like counts to eliminate competitive pressure that fosters authentic expression." },
    { icon: "⏱", title: "10-Minute Limit", desc: "A gentle reminder to stay present. We encourage mindful consumption with a daily happy limit that respects your time." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 page-fade">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-display text-xl text-gray-800">HappyShare</span>
          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <button
                onClick={() => navigate("home")}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                My Posts
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("login")}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Done for Today
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs cursor-pointer hover:bg-gray-300 transition-colors" onClick={() => navigate("login")}>
                  👤
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-gray-800 leading-tight mb-4">
            A calmer place to share good moments.
          </h1>
          <p className="text-gray-500 leading-relaxed mb-7 text-sm">
            No noisy feeds, no pressure, no chasing likes. Just simple posts that
            make your day better.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("register")}
              className="px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Join the Space
            </button>
            <button
              onClick={() => navigate("login")}
              className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Enter the Space
            </button>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1490750967868-88df5691cc3f?w=600&q=80"
            alt="Nature"
            className="w-full h-72 object-cover"
          />
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl text-gray-800 text-center mb-2">Why it feels better here</h2>
          <p className="text-gray-400 text-sm text-center mb-10">
            Built to keep you present, not trapped.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50">
                <div className="text-lg mb-2">{p.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{p.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl text-gray-800 text-center mb-2">Pick your vibe</h2>
          <p className="text-gray-400 text-sm text-center mb-10">
            Choose what you want to see today.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-100 p-5 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">😂</div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Daily Joy</span>
              <h3 className="font-semibold text-gray-800 mt-2 mb-1">Funny</h3>
              <p className="text-xs text-gray-500 mb-4">
                Gentle humor that brightens your day without dragging anyone down.
              </p>
              <button onClick={() => navigate("login")} className="text-xs text-emerald-700 font-semibold hover:text-emerald-900">Explore Funny →</button>
            </div>

            <div className="bg-white rounded-2xl border border-blue-100 p-5 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📚</div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Light Learning</span>
              <h3 className="font-semibold text-gray-800 mt-2 mb-1">Learn & Feel Good</h3>
              <p className="text-xs text-gray-500 mb-4">
                Discover wisdom and positive updates that leave you calmer, not drained.
              </p>
              <button onClick={() => navigate("login")} className="text-xs text-blue-700 font-semibold hover:text-blue-900">Start Learning →</button>
            </div>

            <div className="bg-white rounded-2xl border border-rose-100 p-5 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">❤️</div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">Kindness</span>
              <h3 className="font-semibold text-gray-800 mt-2 mb-1">Heartwarming</h3>
              <p className="text-xs text-gray-500 mb-4">
                Stories of community and compassion that restore trust in people.
              </p>
              <button onClick={() => navigate("login")} className="text-xs text-rose-700 font-semibold hover:text-rose-900">View Stories →</button>
            </div>
          </div>

          <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-gray-800">Simple feed, better mood</h3>
              <p className="text-sm text-gray-600">
                Scroll a little, smile a little, then move on with your day.
              </p>
            </div>
            <button
              onClick={() => navigate(user ? "home" : "register")}
              className="px-4 py-2.5 rounded-xl bg-gray-800 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              {user ? "Go to Feed" : "Start Free"}
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center">
            <h2 className="font-display text-3xl text-gray-800 mb-3">Ready to enter your space?</h2>
            <p className="text-gray-500 text-sm mb-8">
              Join thousands of others who are reclaiming their digital well-being. It's time to feel good about your time online.
            </p>
            <button
              onClick={() => navigate("register")}
              className="px-8 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-gray-700">HappyShare</p>
            <p className="text-xs text-gray-400">© 2024 HappyShare. A space for digital well-being.</p>
          </div>
          <div className="flex gap-5 text-xs text-gray-400">
            <span className="cursor-pointer hover:text-gray-600">Privacy Center</span>
            <span className="cursor-pointer hover:text-gray-600">Sitemap</span>
            <span className="cursor-pointer hover:text-gray-600">Community Guidelines</span>
            <span className="cursor-pointer hover:text-gray-600">Safety Guide</span>
          </div>
        </div>
      </footer>
    </div>
  );
}