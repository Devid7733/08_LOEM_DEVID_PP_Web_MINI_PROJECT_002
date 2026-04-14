"use client";

import { addItemToCart } from "../../lib/cart";

export default function AddToCartButton({
  productId,
  quantity,
  selectedColor,
  selectedSize,
  name,
  imageUrl,
  price,
}) {
  const handleAddToCart = () => {
    const payload = {
      productId,
      quantity,
      color: selectedColor,
      size: selectedSize,
      name,
      imageUrl,
      price,
    };

    addItemToCart(payload);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="rounded-full bg-[#162767] px-10 py-4 text-xl font-semibold text-white shadow-md transition hover:opacity-90"
    >
      🛍 Add to cart
    </button>
  );
}
