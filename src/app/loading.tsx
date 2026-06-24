export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar skeleton */}
      <div className="h-16 bg-surface border-b border-border animate-pulse" />
      
      {/* Hero skeleton */}
      <div className="py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-surface rounded-full animate-pulse" />
              <div className="h-12 w-full bg-surface rounded-xl animate-pulse" />
              <div className="h-12 w-3/4 bg-surface rounded-xl animate-pulse" />
              <div className="h-6 w-2/3 bg-surface rounded-full animate-pulse" />
              <div className="flex gap-3">
                <div className="h-14 w-40 bg-surface rounded-xl animate-pulse" />
                <div className="h-14 w-32 bg-surface rounded-xl animate-pulse" />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="h-80 w-full bg-surface rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-surface rounded-lg animate-pulse mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-surface rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
