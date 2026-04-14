import { useMemo } from "react";

export default function FilterSidebar({
  minPrice = 0,
  maxPrice = 300,
  selectedMaxPrice,
  onPriceChange,
  categories = [],
  selectedCategories = [],
  onCategoryChange,
  onReset,
}) {
  const activeCategoryCount = useMemo(
    () => selectedCategories.length,
    [selectedCategories]
  );

  const quickPrices = [50, 100, 150];

  const handleCheckboxChange = (categoryValue) => {
    const exists = selectedCategories.includes(categoryValue);

    if (exists) {
      onCategoryChange(
        selectedCategories.filter((item) => item !== categoryValue)
      );
    } else {
      onCategoryChange([...selectedCategories, categoryValue]);
    }
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button type="button" className="reset-btn" onClick={onReset}>
          Reset filters
        </button>
      </div>

      <div className="filter-section">
        <p className="section-label">PRICE RANGE</p>
        <p className="price-text">
          ${minPrice} – ${selectedMaxPrice}
        </p>

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedMaxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="range-input"
        />

        <div className="range-values">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      <div className="filter-section">
        <p className="section-label">QUICK SELECT</p>
        <div className="quick-buttons">
          {quickPrices.map((price) => (
            <button
              key={price}
              type="button"
              className={`quick-btn ${
                selectedMaxPrice === price ? "active" : ""
              }`}
              onClick={() => onPriceChange(price)}
            >
              Under ${price}
            </button>
          ))}

          <button
            type="button"
            className={`quick-btn ${
              selectedMaxPrice === maxPrice ? "active" : ""
            }`}
            onClick={() => onPriceChange(maxPrice)}
          >
            All prices
          </button>
        </div>
      </div>

      <div className="filter-section">
        <p className="section-label">CATEGORIES</p>

        <div className="category-list">
          {categories.map((category) => (
            <label key={category.value} className="category-item">
              <div className="category-left">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCheckboxChange(category.value)}
                />
                <span>{category.label}</span>
              </div>

              {typeof category.count === "number" && (
                <span className="category-count">{category.count}</span>
              )}
            </label>
          ))}
        </div>

        <p className="category-hint">
          {activeCategoryCount === 0
            ? "Select categories to filter products."
            : `${activeCategoryCount} categor${
                activeCategoryCount > 1 ? "ies" : "y"
              } selected.`}
        </p>
      </div>
    </aside>
  );
}