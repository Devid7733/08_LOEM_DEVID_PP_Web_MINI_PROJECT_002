import Link from "next/link";

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">
          Your cart
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Cart is stored in memory for this visit — refreshing the page clears
          it.
        </p>
      </header>

      <section className="mt-10 rounded-[28px] border border-dashed border-gray-300 bg-white px-6 py-20 shadow-sm lg:px-10 lg:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Your cart is empty
          </h2>
          <p className="mt-4 text-xl leading-8 text-gray-500">
            Open a product, set quantity, then tap Add to cart.
          </p>

          <Link
            href="/products"
            className="mt-10 inline-flex min-w-56 items-center justify-center rounded-full bg-[#162767] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
          >
            Shop products
          </Link>
        </div>
      </section>
    </main>
  );
}
