export default function QuantitySelector({ value, onChange }) {
  const decrease = () => {
    if (value > 1) onChange(value - 1);
  };

  const increase = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <button
        type="button"
        onClick={decrease}
        className="flex h-12 w-12 items-center justify-center text-3xl text-gray-500 transition hover:text-black"
      >
        -
      </button>

      <span className="min-w-12 text-center text-2xl font-semibold text-slate-800">
        {value}
      </span>

      <button
        type="button"
        onClick={increase}
        className="flex h-12 w-12 items-center justify-center text-3xl text-gray-500 transition hover:text-black"
      >
        +
      </button>
    </div>
  );
}