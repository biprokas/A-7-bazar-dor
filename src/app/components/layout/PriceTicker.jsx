import { getProducts } from "@/lib/api";
import React from "react";

const toBanglaNumber = (value) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
const PriceTicker = async () => {
  const res = await getProducts();
  const products = Array.isArray(res) ? res : [];
  return (
    <div className="animate-marquee w-max  overflow-hidden border-b border-gray-200 bg-gray-50 py-3">
      <div className="flex items-center gap-8">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 text-sm"
          >
            <span>{product.image || product.categoryIcon || "🛒"}</span>
            <span className="font-medium text-gray-800">{product.nameBn}</span>
            <span className="font-semibold text-gray-900">
              ৳{toBanglaNumber(product.today)}/{product.unit}
            </span>
            <span
              className={
                product.change?.dir === "up"
                  ? "text-red-600"
                  : product.change?.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }
            >
              {product.change?.dir === "up"
                ? "▲"
                : product.change?.dir === "down"
                  ? "▼"
                  : "—"}
              {toBanglaNumber(product.change?.pct ?? 0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
