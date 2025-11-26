import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-72 bg-white/80 backdrop-blur-sm border-r border-purple-100 flex flex-col transition-all duration-200 shadow-sm">
      {/* Header */}
      <div className="border-b border-purple-100 w-full p-4 bg-gradient-to-r from-pink-100/50 to-purple-100/50">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-200/30 animate-pulse w-9 h-9" />
          <span className="h-4 w-24 bg-purple-200/30 rounded animate-pulse" />
        </div>
        <div className="mt-3 h-4 w-32 bg-purple-200/20 rounded animate-pulse" />
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-2 flex-1 space-y-1 px-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3 rounded-xl">
            {/* Avatar skeleton */}
            <div className="size-12 rounded-full bg-purple-200/30 animate-pulse flex-shrink-0" />

            {/* User info skeleton */}
            <div className="flex-1 text-left min-w-0 space-y-2">
              <div className="h-4 w-32 bg-purple-200/20 rounded-full animate-pulse" />
              <div className="h-3 w-16 bg-purple-200/10 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;