export default function LandingPage({ navigate, user }) {
  const principles = [
    {
      icon: "⏸️",
      title: "Natural Stop Points",
      desc: "No endless rabbit holes. You get a clear moment to pause and move on.",
    },
    {
      icon: "🌱",
      title: "Gentle Energy",
      desc: "A feed designed to leave you lighter, not overwhelmed or drained.",
    },
    {
      icon: "🧭",
      title: "Intentional Time",
      desc: "We reward meaningful moments, not screen-time addiction.",
    },
  ];

  const moods = [
    {
      title: "Laugh",
      subtitle: "Funny",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=80",
    },
    {
      title: "Learn",
      subtitle: "Feel-Good Knowledge",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=80",
    },
    {
      title: "Heal",
      subtitle: "Heartwarming Stories",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80",
    },
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
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <span className="inline-block text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full mb-4">
                A better social rhythm
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-gray-800 leading-tight mb-4">
                Share good moments.
                <br />
                Leave with a clear mind.
              </h1>
              <p className="text-gray-500 leading-relaxed mb-7 text-sm">
                HappyShare is a quieter corner of the internet where people post
                joy, kindness, and useful inspiration without pressure.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("register")}
                  className="px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Create Account
                </button>
                <button
                  onClick={() => navigate("login")}
                  className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="relative min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=1200&q=80"
                alt="Creative collage"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl text-gray-800 text-center mb-2">Why it feels better here</h2>
          <p className="text-gray-400 text-sm text-center mb-10">
            Built to keep you present, not trapped.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50">
                <div className="text-2xl mb-2">{p.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{p.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mood board */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl text-gray-800 text-center mb-2">Choose your mood board</h2>
          <p className="text-gray-400 text-sm text-center mb-10">
            Every tab gives you a different emotional texture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {moods.map((mood) => (
              <button
                key={mood.title}
                onClick={() => navigate("login")}
                className="text-left group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={mood.image}
                  alt={mood.title}
                  className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform"
                />
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                    {mood.subtitle}
                  </p>
                  <h3 className="font-semibold text-gray-800 text-lg">{mood.title}</h3>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-gray-800">Creative, calm, and actually useful</h3>
              <p className="text-sm text-gray-600">
                Start with one post. End with one good idea.
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
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
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