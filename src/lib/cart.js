"use client";

const CART_STORAGE_KEY = "purelystore-cart";
const CART_UPDATED_EVENT = "purelystore-cart-updated";

function readCartItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCartItems(items) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
}

export function getCartItems() {
  return readCartItems();
}

export function getCartCount() {
  return readCartItems().reduce(
    (total, item) => total + Number(item?.quantity || 0),
    0
  );
}

export function addItemToCart(item) {
  if (typeof window === "undefined") {
    return;
  }

  const quantity = Math.max(1, Number(item?.quantity || 1));
  const items = readCartItems();

  const existingIndex = items.findIndex((entry) => {
    return (
      String(entry?.productId) === String(item?.productId) &&
      String(entry?.color || "") === String(item?.color || "") &&
      String(entry?.size || "") === String(item?.size || "")
    );
  });

  if (existingIndex >= 0) {
    items[existingIndex] = {
      ...items[existingIndex],
      quantity: Number(items[existingIndex].quantity || 0) + quantity,
    };
  } else {
    items.push({
      productId: item?.productId,
      quantity,
      color: item?.color || "",
      size: item?.size || "",
      name: item?.name || "",
      imageUrl: item?.imageUrl || "",
      price: Number(item?.price || 0),
    });
  }

  writeCartItems(items);
}

export function subscribeToCartUpdates(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleUpdate = () => callback(getCartCount());

  window.addEventListener(CART_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleUpdate);

  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleUpdate);
  };
}
