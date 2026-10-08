import {
  getCategories,
  getProduct,
  getProducts,
  getProductsByCategory,
} from "@/lib/api";

const Page = async () => {
  const categories = await getCategories();
  const products = await getProducts();
  const byCategory = await getProductsByCategory("chal");
  const product = await getProduct(1);

  console.log("categories:", categories);
  console.log("products:", products);
  console.log("byCategory:", byCategory);
  console.log("product:", product);

  return <div>Bazar Dor</div>;
};

export default Page;
