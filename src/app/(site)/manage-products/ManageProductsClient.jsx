"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../../../components/manage-products/ProductCard";
import CreateProductModal from "./CreateProductModal";

export default function ManageProductsClient({
  initialProducts = [],
  token,
  baseUrl,
}) {
  const router = useRouter();
  const [sortValue, setSortValue] = useState("name-asc");
  const [products] = useState(initialProducts);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const sortedProducts = useMemo(() => {
    const copied = [...products];

    switch (sortValue) {
      case "name-desc":
        return copied.sort((a, b) => b.name.localeCompare(a.name));
      case "name-asc":
      default:
        return copied.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [products, sortValue]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">
              Manage Products
            </h1>
            <p className="mt-3 text-2xl text-gray-500">
              Create, update, and delete products.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start">
            <span className="text-xl text-gray-500">Sort</span>
            <select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className="rounded-full border border-gray-200 bg-white px-5 py-3 text-lg text-slate-700 shadow-sm outline-none"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold text-slate-950">Products</h2>

            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setOpenCreateModal(true);
              }}
              className="rounded-full bg-[#9be000] px-6 py-3 text-lg font-semibold text-slate-900 transition hover:opacity-90"
            >
              + Create product
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={(item) => {
                  setEditingProduct(item);
                  setOpenCreateModal(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <CreateProductModal
        open={openCreateModal}
        mode={editingProduct ? "edit" : "create"}
        initialProduct={editingProduct}
        onClose={() => {
          setOpenCreateModal(false);
          setEditingProduct(null);
        }}
        onCreated={() => {
          setOpenCreateModal(false);
          setEditingProduct(null);
          router.refresh();
        }}
        token={token}
        baseUrl={baseUrl}
      />
    </>
  );
}
