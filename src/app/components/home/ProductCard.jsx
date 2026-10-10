import Link from "next/link";

const toBanglaNumber = (value) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const unitLabels = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  pcs: "পিস",
};

const ProductCard = ({ product }) => {
  const direction = product.change?.dir;
  const percentage = product.change?.pct ?? 0;
  const isUp = direction === "up";
  const isDown = direction === "down";
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <Link href={`/product/${product.id}`} className="block">
      <article className="flex min-h-36 flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md">
        {/* Top: Image and product name */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-3xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-2 font-semibold text-gray-900">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              প্রতি {unitLabels[product.unit] || product.unit}
            </p>
          </div>
        </div>

        {/* Bottom: Today's price and percentage */}
        <div className="mt-5 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-lg font-bold text-gray-900">
              ৳{toBanglaNumber(product.today)}
            </p>
          </div>

          <div
            className={`text-right text-sm font-semibold ${
              isUp
                ? "text-red-600"
                : isDown
                  ? "text-green-600"
                  : "text-gray-500"
            }`}
          >
            <p>
              {isUp ? "▲" : isDown ? "▼" : "—"} {toBanglaNumber(percentage)}%
            </p>

            <p className="mt-1 text-xs font-normal">
              {isUp ? "দাম বেড়েছে" : isDown ? "দাম কমেছে" : "পরিবর্তন নেই"}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
