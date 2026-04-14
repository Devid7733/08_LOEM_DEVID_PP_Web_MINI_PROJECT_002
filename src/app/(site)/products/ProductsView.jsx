"use client";
import EmptyProductsState from "./EmptyProductState";
import React, { useMemo, useState } from "react";
import SearchBarComponent from "../../../components/SearchBarComponent";
import FilterSidebar from "../../../components/FilterSideBar";
import ShopCardComponent from "../../../components/shop/ShopCardComponent";

export default function ProductsView({ allProducts, categoryOptions }) {
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(300);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function getCategoryName(categoryId) {
    const found = categoryOptions.find(
      (c) => String(c.value) === String(categoryId)
    );
    return found ? found.label : "Unknown";
  }

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchPrice = product.price <= selectedMaxPrice;
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.categoryId);
      const matchName = (product.name || "")
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      return matchPrice && matchCategory && matchName;
    });
  }, [allProducts, searchTerm, selectedMaxPrice, selectedCategories]);

  const handleReset = () => {
    setSelectedMaxPrice(300);
    setSelectedCategories([]);
    setSearchTerm("");
  };

  return (
    <main className="w-full mx-auto max-w-7xl py-15">
      <header className="flex justify-between pb-5">
        <div>
          <h1 className="text-3xl font-extrabold">Luxury Beauty Products</h1>
          <p>Use the filters to narrow by price and brand</p>
        </div>
        <SearchBarComponent value={searchTerm} onChange={setSearchTerm} />
      </header>

      <div className="flex gap-6">
        <FilterSidebar
          minPrice={0}
          maxPrice={300}
          selectedMaxPrice={selectedMaxPrice}
          onPriceChange={setSelectedMaxPrice}
          categories={categoryOptions}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          onReset={handleReset}
        />

        <div>
          <div className="mb-4 text-sm text-gray-500">
            Showing {filteredProducts.length} products
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyProductsState onReset={handleReset} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ShopCardComponent
                  key={product.productId}
                  product={product}
                  categoryName={getCategoryName(product.categoryId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
