"use client";

export default function ProductDetailView({ product }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl border bg-gray-50 p-8">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.productName}
            className="mx-auto h-[500px] w-full object-contain"
          />
        </div>

        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Home / Products / {product.productName}
          </p>

          <h1 className="text-4xl font-bold">{product.productName}</h1>

          <p className="text-3xl font-semibold text-lime-700">
            ${product.price}
          </p>

          <p className="text-gray-600">
            {product.description || "No description available."}
          </p>

          <button className="rounded-full bg-lime-400 px-8 py-3 font-semibold text-gray-900">
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}