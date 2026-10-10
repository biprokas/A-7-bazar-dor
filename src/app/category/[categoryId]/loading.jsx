export default function Loading() {
  return (
    <main className=" min-h-screen px-4 py-10">
      <div className="mb-8 animate-pulse">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="mt-4 h-8 w-48 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-64 rounded bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    </main>
  );
}
