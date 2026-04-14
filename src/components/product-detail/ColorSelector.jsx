export default function ColorSelector({ label, options = [], value, onChange }) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">{label}</h2>

      <div className="flex flex-wrap gap-3">
        {options.map((color) => {
          const active = value === color;

          return (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`rounded-full border px-6 py-3 text-xl font-medium capitalize transition ${
                active
                  ? "border-[#57df8a] bg-[#57df8a] text-slate-800"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              {color}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-lg text-gray-400">Selected: {value}</p>
    </div>
  );
}