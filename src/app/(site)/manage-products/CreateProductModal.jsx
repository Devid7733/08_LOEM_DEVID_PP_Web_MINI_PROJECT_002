"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const COLOR_OPTIONS = ["green", "gray", "red", "blue", "white"];
const SIZE_OPTIONS = ["s", "m", "l", "xl", "xxl", "xxxl"];

export default function CreateProductModal({
  open,
  mode = "create",
  initialProduct,
  onClose,
  onCreated,
  token,
  baseUrl,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isEditMode = mode === "edit";

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    if (isEditMode && initialProduct) {
      setName(initialProduct.name || "");
      setPrice(String(initialProduct.price ?? ""));
      setCategoryId(initialProduct.categoryId || "");
      setImageUrl(initialProduct.image || "");
      setDescription(initialProduct.description || "");
      setSelectedColors(
        Array.isArray(initialProduct.colors) ? initialProduct.colors : []
      );
      setSelectedSizes(
        Array.isArray(initialProduct.sizes) ? initialProduct.sizes : []
      );
      setErrorMessage("");
      return;
    }

    resetForm();
  }, [initialProduct, isEditMode, open]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategoryId("");
    setImageUrl("");
    setDescription("");
    setSelectedColors([]);
    setSelectedSizes([]);
    setErrorMessage("");
  };

  const toggleSelection = (value, setter) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Product name is required.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setErrorMessage("Price must be greater than 0.");
      return;
    }

    if (!categoryId.trim()) {
      setErrorMessage("Category ID is required.");
      return;
    }

    if (selectedColors.length === 0) {
      setErrorMessage("Please choose at least one color.");
      return;
    }

    if (selectedSizes.length === 0) {
      setErrorMessage("Please choose at least one size.");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      colors: selectedColors,
      sizes: selectedSizes,
      imageUrl: imageUrl.trim(),
      price: Number(price),
      categoryId: categoryId.trim(),
    };

    try {
      setLoading(true);

      const url = isEditMode
        ? `${baseUrl}/products/${initialProduct?.id}`
        : `${baseUrl}/products`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            (isEditMode ? "Failed to update product" : "Failed to create product")
        );
      }

      resetForm();
      onCreated?.();
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4">
      <div className="w-full max-w-3xl rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-start justify-between px-8 pt-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {isEditMode ? "Edit product" : "Create product"}
            </h2>
            <p className="mt-2 text-lg text-gray-500">
              {isEditMode
                ? "Update this product from your backend API."
                : "Create a new product from your backend API."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-slate-600"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-8 py-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-lg font-medium text-slate-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-lg outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-medium text-slate-800">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-lg outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-medium text-slate-800">
                Category ID
              </label>
              <input
                type="text"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-lg outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-lg font-medium text-slate-800">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-lg outline-none"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-3 block text-lg font-medium text-slate-800">
              Colors
            </label>
            <div className="flex flex-wrap gap-3">
              {COLOR_OPTIONS.map((item) => {
                const active = selectedColors.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSelection(item, setSelectedColors)}
                    className={`rounded-full border px-4 py-2 text-lg capitalize ${
                      active
                        ? "border-[#57df8a] bg-[#57df8a] text-slate-900"
                        : "border-gray-200 text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-3 block text-lg font-medium text-slate-800">
              Sizes
            </label>
            <div className="flex flex-wrap gap-3">
              {SIZE_OPTIONS.map((item) => {
                const active = selectedSizes.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSelection(item, setSelectedSizes)}
                    className={`rounded-full border px-4 py-2 text-lg uppercase ${
                      active
                        ? "border-[#5b86f7] text-[#2f62e8]"
                        : "border-gray-200 text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-lg font-medium text-slate-800">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description shown on the product card..."
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-lg outline-none"
            />
          </div>

          {errorMessage ? (
            <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-gray-100 px-8 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-300 px-6 py-3 text-lg font-medium text-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-full bg-[#9be000] px-7 py-3 text-lg font-semibold text-slate-900 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isEditMode
                ? "Saving..."
                : "Creating..."
              : isEditMode
                ? "Save changes"
                : "Create product"}
          </button>
        </div>
      </div>
    </div>
  );
}
