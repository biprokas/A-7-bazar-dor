"use client";

export default function ProductError({ reset }) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        পণ্যের তথ্য লোড করা যায়নি
      </h2>
      <p className="mt-3 text-gray-600">
        সার্ভারে সমস্যা হতে পারে। আবার চেষ্টা করো।
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
      >
        আবার চেষ্টা করুন
      </button>
    </main>
  );
}
