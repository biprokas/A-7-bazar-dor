export default function Loading() {
  return (
    <main className="space-y-10 px-4 py-10">
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <section key={sectionIndex} className="animate-pulse">
           
          <div className="mb-5 h-8 w-48 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-36 rounded-xl bg-gray-200" />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
