"use client";

import { useMemo, useState } from "react";
import ProductCard from "../home/ProductCard";

const CategoryProductList = ({ products }) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOrder === "low-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortOrder]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          মোট {sortedProducts.length} টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="product-sort" className="text-sm text-gray-600">
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 p-10 text-center">
          <p className="font-semibold text-gray-800">কোনো পণ্য পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  );
};

export default CategoryProductList;
