import { useState } from "react";

export default function FeelingLowOverlay({ onClose, quote, onTryAnother }) {
  const [tries, setTries] = useState(0);

  const tryAnother = async () => {
    if (tries >= 2) return;
    setTries((t) => t + 1);
    if (onTryAnother) {
      await onTryAnother();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Background nature image */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative bg-white/95 backdrop-blur rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-7 page-fade">
        {/* Mood tag */}
        <div className="inline-flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-4">
          ❤️ Mood boost
        </div>

        <h2 className="font-display text-2xl text-gray-800 mb-3">
          Take a deep breath.
        </h2>

        <blockquote className="text-sm text-gray-600 italic leading-relaxed mb-4 border-l-2 border-emerald-300 pl-3">
          "{quote || "You are doing better than you think. Keep going."}"
        </blockquote>

        {/* Daily balance */}
        <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-700 mb-6 flex items-start gap-2">
          <span>🌿</span>
          <span>
            You've been nurturing your space for{" "}
            {Math.floor(Math.random() * 5) + 1} minutes today.
          </span>
        </div>

        <div className="flex gap-3">
          {tries < 2 && (
            <button
              onClick={tryAnother}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Try another
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            I'm feeling better now
          </button>
        </div>
      </div>
    </div>
  );
}
