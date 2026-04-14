"use client";

import Image from "next/image";
import { Plus, Star } from "lucide-react";
import ProductCardMenu from "./ProductMenuCard";
import { addItemToCart } from "../../lib/cart";

export default function ProductCard({ product, onEdit }) {
  const handleAddToCart = () => {
    addItemToCart({
      productId: product.id,
      quantity: 1,
      name: product.name,
      imageUrl: product.image,
      price: product.price,
    });
  };

  return (
    <div className="rounded-[26px] border border-gray-200 bg-white p-4 shadow-sm">
      <div className="relative rounded-[22px] border border-gray-100 bg-[#f7f8fa] p-4">
        <div className="absolute right-4 top-4">
          <ProductCardMenu onEdit={() => onEdit?.(product)} />
        </div>

        <div className="relative mx-auto h-[320px] w-full max-w-[240px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                size={18}
                className={
                  item <= product.rating
                    ? "fill-[#f4b400] text-[#f4b400]"
                    : "fill-[#e5e7eb] text-[#e5e7eb]"
                }
              />
            ))}
            <span className="ml-1 text-sm text-gray-400">
              {product.rating > 0 ? product.rating : ""}
            </span>
          </div>

          <h3 className="truncate text-xl font-semibold text-slate-900">
            {product.name}
          </h3>

          <p className="mt-2 text-xl font-bold text-slate-950">
            ${product.price}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
          className="mt-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#9be000] text-slate-950 shadow-sm transition hover:opacity-90"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
