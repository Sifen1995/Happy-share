export default function HappyLimitOverlay({ onDismiss, onDoneForToday }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-7 text-center page-fade">
        <div className="text-4xl mb-4">⏰</div>
        <h2 className="font-display text-2xl text-gray-800 mb-2">
          You've had your happy dose!
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          You've been here 10 minutes. We encourage mindful consumption — your
          time is precious.
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onDoneForToday}
            className="w-full py-3 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Done for today 🌅
          </button>
          <button
            onClick={onDismiss}
            className="w-full py-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Stay a little longer
          </button>
        </div>
      </div>
    </div>
  );
}
