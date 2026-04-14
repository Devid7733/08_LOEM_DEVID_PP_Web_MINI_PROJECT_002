export default function SizeSelector({ label, options = [], value, onChange }) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">{label}</h2>

      <div className="flex flex-wrap gap-3">
        {options.map((size) => {
          const active = value === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              className={`flex h-14 min-w-14 items-center justify-center rounded-full border px-5 text-xl font-semibold uppercase transition ${
                active
                  ? "border-[#5b86f7] text-[#2f62e8]"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <span
                className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${
                  active ? "bg-[#2f62e8]" : "bg-gray-300"
                }`}
              />
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}