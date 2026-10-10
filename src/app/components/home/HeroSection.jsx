import { getProduct } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <section>
      <div className="my-6 flex flex-col-reverse items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:p-8 dark:border-slate-800 dark:bg-slate-900">
        {/* Left Content */}
        <div className="flex flex-1 flex-col items-start text-left">
          {/* Date Badge matching the primary green color theme */}
          <span className="mb-3 inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/70 dark:text-green-300">
            📅 {date}
          </span>

          {/* Title */}
          <h1 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl dark:text-white">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-400">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Action Button */}
          <Link
            href="#products"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-green-700 hover:shadow-lg active:scale-95"
          >
            সব পণ্য দেখুন →
          </Link>
        </div>

        {/* Right Image Container */}
        <div className="relative flex shrink-0 justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ছবি"
            width={300}
            height={300}
            className="h-auto max-w-[220px] object-contain sm:max-w-[280px] md:max-w-[300px]"
            priority
          />
        </div>
      </div>

      {/* price increased */}
    </section>
  );
};

export default HeroSection;
