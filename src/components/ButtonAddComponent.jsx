'use client'

import { Button } from "@heroui/react";
import React from "react";
import { addItemToCart } from "../lib/cart";

export default function ButtonAddComponent({
  productId,
  name,
  imageUrl,
  price,
}) {
  const handleAddToCart = () => {
    addItemToCart({
      productId,
      quantity: 1,
      name,
      imageUrl,
      price,
    });
  };

  return (
    <Button
      isIconOnly
      aria-label="Add to cart"
      onPress={handleAddToCart}
      className={`size-11 rounded-full bg-lime-400 text-xl font-light text-gray-900 shadow-sm transition hover:bg-lime-300 active:scale-95}`}
    >
      +
    </Button>
  );
}
