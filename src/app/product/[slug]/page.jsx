import Link from "next/link";
import { getProduct } from "@/lib/api";
import { requireAuth } from "@/lib/require-auth";

const toBanglaNumber = (value) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const ProductDetailsPage = async ({ params }) => {
  await requireAuth();

  const { slug } = await params;

  let response;

  try {
    response = await getProduct(slug);
  } catch {
    response = null;
  }

  const product = response?.data ?? response?.product ?? response;

  if (!product || !product.nameBn) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">পণ্য পাওয়া যায়নি</h1>
        <p className="mt-3 text-gray-600">
          পণ্যটির তথ্য পাওয়া যাচ্ছে না অথবা API-তে সমস্যা হয়েছে।
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

  const markets = Array.isArray(product.markets) ? product.markets : [];

  const minimumPrices = markets
    .map((market) => Number(market.min))
    .filter((price) => Number.isFinite(price));

  const maximumPrices = markets
    .map((market) => Number(market.max))
    .filter((price) => Number.isFinite(price));

  const minPrice = minimumPrices.length ? Math.min(...minimumPrices) : null;

  const maxPrice = maximumPrices.length ? Math.max(...maximumPrices) : null;

  const averagePrice = markets.length
    ? markets.reduce(
        (sum, market) => sum + (Number(market.min) + Number(market.max)) / 2,
        0,
      ) / markets.length
    : null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <main className="items-center min-h-screen max-w-7xl px-4 py-10">
      <Link href="/" className="text-sm text-green-700 hover:underline">
        ← হোম পেজ
      </Link>
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-6xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-500">
              {product.categoryIcon} {product.categoryNameBn}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              প্রতি
              {product.unit === "kg"
                ? "কেজি"
                : product.unit === "liter"
                  ? "লিটার"
                  : product.unit}
            </p>

            <div className="mt-5">
              <p className="text-sm text-gray-500">আজকের দাম</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                ৳{toBanglaNumber(product.today)}
              </p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {isUp
                  ? "▲ দাম বেড়েছে"
                  : isDown
                    ? "▼ দাম কমেছে"
                    : "— পরিবর্তন নেই"}
                ({toBanglaNumber(product.change?.pct ?? 0)}%)
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন বাজারদর", value: minPrice },
            { label: "সর্বোচ্চ বাজারদর", value: maxPrice },
            { label: "গড় বাজারদর", value: averagePrice },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {item.value === null
                  ? "তথ্য নেই"
                  : `৳${toBanglaNumber(item.value)}`}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">বাজারভিত্তিক দাম</h2>

        {markets.length > 0 ? (
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3">বাজার</th>
                  <th className="px-4 py-3">বিভাগ</th>
                  <th className="px-4 py-3">সর্বনিম্ন দাম</th>
                  <th className="px-4 py-3">সর্বোচ্চ দাম</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-100"
                  >
                    <td className="px-4 py-3 text-gray-800">{market.market}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {market.division}
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-700">
                      ৳{toBanglaNumber(market.min)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      ৳{toBanglaNumber(market.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 rounded-xl border border-gray-200 p-5 text-gray-500">
            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
};

export default ProductDetailsPage;
