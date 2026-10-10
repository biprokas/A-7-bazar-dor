import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategoryProductList from "@/app/components/category/CategoryProductList";
import { requireAuth } from "@/lib/require-auth";

const toBanglaNumber = (value) => new Intl.NumberFormat("bn-BD").format(value);

const CategoryPage = async ({ params }) => {
  await requireAuth();
  const { categoryId } = await params;

  const [categoriesResponse, productsResponse] = await Promise.all([
    getCategories(),
    getProductsByCategory(categoryId),
  ]);

  const categories = Array.isArray(categoriesResponse)
    ? categoriesResponse
    : Array.isArray(categoriesResponse?.data)
      ? categoriesResponse.data
      : [];

  const products = Array.isArray(productsResponse)
    ? productsResponse
    : Array.isArray(productsResponse?.data)
      ? productsResponse.data
      : Array.isArray(productsResponse?.products)
        ? productsResponse.products
        : Array.isArray(productsResponse?.data?.products)
          ? productsResponse.data.products
          : [];

  const category = categories.find(
    (item) => item.id === categoryId || item.slug === categoryId,
  );

  if (!category) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-gray-600">
          এই ক্যাটাগরিটি সঠিক নয় অথবা বর্তমানে উপলব্ধ নেই।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className=" min-h-screen max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          <span className="mr-2">{category.icon}</span>
          {category.nameBn}
        </h1>

        <p className="mt-2 text-gray-600">
          {toBanglaNumber(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </div>
      <div>
        <CategoryProductList products={products} />
      </div>
    </main>
  );
};

export default CategoryPage;
