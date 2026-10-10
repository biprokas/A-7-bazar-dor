export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl animate-pulse px-4 py-10">
        
      <div className="h-4 w-24 rounded bg-gray-200" />
      <div className="mt-6 rounded-2xl border border-gray-200 p-6 sm:p-8">
        <div className="flex gap-5">
          <div className="h-24 w-24 rounded-2xl bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="h-6 w-32 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="mt-8 h-7 w-48 rounded bg-gray-200" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-24 rounded-xl bg-gray-200" />
        ))}
      </div>
      <div className="mt-8 h-7 w-48 rounded bg-gray-200" />
      <div className="mt-4 h-48 rounded-xl bg-gray-200" />
    </main>
  );
}
