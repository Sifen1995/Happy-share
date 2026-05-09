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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md page-fade bg-white border border-gray-100 rounded-3xl shadow-sm p-7">
          <button
            onClick={() => navigate("landing")}
            className="text-xs text-gray-500 hover:text-gray-700 mb-4"
          >
            ← Home
          </button>

          {/* Logo */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">✦</span>
              <span className="font-display text-xl text-gray-800">HappyShare</span>
            </div>
            <h1 className="font-display text-3xl text-gray-800 mb-1">Create account</h1>
            <p className="text-sm text-gray-500">Start sharing better moments today.</p>
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
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
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
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="At least 6 characters"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            />
          </div>

          {/* Mindfulness note */}
          <div className="mb-5 text-xs text-gray-500 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 leading-relaxed">
            🌿 Take a deep breath before you enter. Digital spaces are more
            pleasant when approached with intention.
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 disabled:opacity-60 transition-colors mb-3 shadow-sm"
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
              <span>G</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <span>A</span> Apple
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
  );
}
