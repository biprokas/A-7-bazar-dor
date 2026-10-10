import {
  getCategories,
  getProduct,
  getProducts,
  getProductsByCategory,
} from "@/lib/api";
import ProductCard from "./components/home/ProductCard";
import HeroSection from "./components/home/HeroSection";

const toBanglaNumber = (value) => new Intl.NumberFormat("bn-BD").format(value);

    

const Page = async () => {
  const categories = await getCategories();

  const byCategory = await getProductsByCategory("chal");
  const product = await getProduct(1);

  // console.log("categories:", categories);
  // console.log("products:", products);
  // console.log("byCategory:", byCategory);
  // console.log("product:", product);

  const response = await getProducts();
  const products = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.products)
        ? response.products
        : Array.isArray(response?.data?.products)
          ? response.data.products
          : [];

  const risingProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallingProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    
    <main className=" space-y-12 px-4 py-10">
      <HeroSection/>
      {/* Today's price increases */}
      <section id="price-movers">
        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          <span className="mr-2 text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        {risingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500"> দাম বৃদ্ধির কোনো তথ্য পাওয়া যায়নি। </p>
        )}
      </section>
      {/* Today's price decreases */}
      <section>
        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          <span className="mr-2 text-green-600">▼</span> আজ দাম কমেছে
        </h2>
        {fallingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500"> দাম কমার কোনো তথ্য পাওয়া যায়নি। </p>
        )}
      </section>
      {/* All products */}
      <section id="products">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900"> সব পণ্য </h2>
            <p className="mt-2 text-sm text-gray-500">
              মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-gray-200 p-6 text-gray-500">
            কোনো পণ্য পাওয়া যায়নি। API response পরীক্ষা করো।
          </p>
        )}
      </section>
    </main>
  );
};

export default Page;
