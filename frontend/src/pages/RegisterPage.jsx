import { useState } from "react";
import { authApi } from "../lib/api";

export default function RegisterPage({ navigate, onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!username.trim() || !email.trim() || !password.trim())
      return setError("Please fill in all fields.");
    if (username.length < 3)
      return setError("Username must be at least 3 characters.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    setLoading(true);
    setError("");

    try {
      const data = await authApi.register({ username, email, password });
      onLogin({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        token: data.token,
      });
    } catch (e) {
      setError(e.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: image panel */}
      <div className="hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
          alt="Forest view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-gray-800/30" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="font-display text-2xl mb-2 leading-snug">
            "Your digital space should feel like a breath of fresh air."
          </p>
          <p className="text-sm text-white/70">— The HappyShare Manifesto</p>
        </div>
      </div>

      {/* Right: register form */}
      <div className="flex items-center justify-center px-8 py-16 bg-gray-50">
        <div className="w-full max-w-sm page-fade">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-emerald-600 font-bold text-lg">✦</span>
              <span className="font-display text-xl text-gray-800">
                HappyShare
              </span>
            </div>
            <h1 className="font-display text-2xl text-gray-800 mb-1">
              Join HappyShare
            </h1>
            <p className="text-sm text-gray-400">
              Nurturing your digital space, one happy moment at a time.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-100 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose your username"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="At least 6 characters"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            />
          </div>

          {/* Mindfulness note */}
          <div className="mb-5 text-xs text-gray-400 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 leading-relaxed">
            🌿 Take a deep breath before you enter. Digital spaces are more
            pleasant when approached with intention.
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 disabled:opacity-60 transition-colors mb-3"
          >
            {loading ? "Creating your account..." : "Create My Account"}
          </button>

          <button
            onClick={() => navigate("login")}
            className="w-full py-3 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors mb-6"
          >
            Already have an account? Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or connect with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <span>G</span> Gmail
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <span>𝕏</span> Flickr
            </button>
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span className="cursor-pointer hover:text-gray-600">Privacy</span>
            <span className="cursor-pointer hover:text-gray-600">Terms</span>
            <span className="cursor-pointer hover:text-gray-600">
              Safety Guide
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
