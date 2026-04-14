"use client";

import { useState } from "react";
import Image from "next/image";
import { RotateCcw, Star } from "lucide-react";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";

export default function ProductDetailClient({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span>Home</span>
        <span>/</span>
        <span>Products</span>
        <span>/</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex min-h-[620px] items-center justify-center rounded-[28px] border border-gray-200 bg-[#f7f8fa] p-8">
          <div className="relative h-[520px] w-full max-w-[420px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="max-w-[560px]">
          <div className="mb-5 flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 lg:text-6xl">
              {product.name}
            </h1>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star
                  key={item}
                  size={26}
                  className={
                    item <= product.rating
                      ? "fill-[#f4b400] text-[#f4b400]"
                      : "fill-[#d9dde4] text-[#d9dde4]"
                  }
                />
              ))}
            </div>
          </div>

          <div className="mb-10 flex items-center gap-4">
            <span className="text-4xl font-bold text-[#213a8f]">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-3xl text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          </div>

          <div className="space-y-8">
            <ColorSelector
              label="Choose a color"
              options={product.colors}
              value={selectedColor}
              onChange={setSelectedColor}
            />

            <SizeSelector
              label="Choose a size"
              options={product.sizes}
              value={selectedSize}
              onChange={setSelectedSize}
            />

            <p className="max-w-xl text-2xl leading-relaxed text-gray-600">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <QuantitySelector value={quantity} onChange={setQuantity} />

              <AddToCartButton
                productId={product.id}
                quantity={quantity}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                name={product.name}
                imageUrl={product.image}
                price={product.price}
              />
            </div>

            <div className="flex items-start gap-4 rounded-[24px] border border-gray-200 bg-white px-6 py-7 shadow-sm">
              <div className="mt-1 text-gray-700">
                <RotateCcw size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {product.returnTitle}
                </h3>
                <p className="mt-1 text-lg text-gray-500">
                  {product.returnDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
