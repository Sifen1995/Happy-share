export default function MoodCheckIn({ onSelect }) {
  const moods = [
    { key: "low", emoji: "😔", label: "Low" },
    { key: "okay", emoji: "😊", label: "Okay" },
    { key: "good", emoji: "✨", label: "Good" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 page-fade">
        <h2 className="font-display text-2xl text-gray-800 text-center mb-2">
          How are you feeling right now?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-7 leading-relaxed">
          Take a moment to check in with yourself. We'll tailor your space to your current vibe.
        </p>

        <div className="flex gap-3 justify-center mb-6">
          {moods.map((mood) => (
            <button
              key={mood.key}
              onClick={() => onSelect(mood.key)}
              className="flex-1 flex flex-col items-center gap-2 py-4 px-2 border-2 border-gray-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {mood.emoji}
              </span>
              <span className="text-sm font-medium text-gray-700">{mood.label}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center italic leading-relaxed">
          "You are allowed to be both a masterpiece and a work in progress, simultaneously."
        </p>
      </div>
    </div>
  );
}