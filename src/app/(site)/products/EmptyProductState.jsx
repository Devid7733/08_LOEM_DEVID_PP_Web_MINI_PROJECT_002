function EmptyProductsState({ onReset }) {
  return (
    <div className="flex min-h-[290px] w-full items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-10 shadow-sm">
      <div className="mx-auto max-w-md text-center">
        <h3 className="text-2xl font-semibold text-gray-900">
          No products match these filters
        </h3>

        <p className="mt-3 text-sm text-gray-500">
          Try raising the price limit or clearing category filters.
        </p>

        <button
          type="button"
          onClick={onReset}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gray-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Reset all filters
        </button>
      </div>
    </div>
  );
}

export default EmptyProductsState;