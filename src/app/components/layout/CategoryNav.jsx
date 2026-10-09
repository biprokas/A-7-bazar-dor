import { getCategories } from "@/lib/api";
import Link from "next/link";
import React from "react";

const CategoryNav = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b border-gray-200 bg-white ">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-3">
        
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-2 text-sm text-gray-600 transition hover:text-green-600"
          >
            <span>{category.icon}</span> <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
