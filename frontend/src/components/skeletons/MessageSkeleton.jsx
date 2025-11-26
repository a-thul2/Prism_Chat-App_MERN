const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`flex gap-3 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
          {idx % 2 === 0 && (
            <div className="size-8 rounded-full bg-purple-200/50 animate-pulse flex-shrink-0" />
          )}

          <div className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"}`}>
            <div className={`h-3 w-24 rounded-full animate-pulse mb-2 ${
              idx % 2 === 0 ? "bg-purple-200/50" : "bg-pink-200/50"
            }`} />
            <div className={`h-12 w-56 rounded-2xl animate-pulse ${
              idx % 2 === 0 ? "bg-purple-100/50" : "bg-pink-200/30"
            }`} />
          </div>

          {idx % 2 !== 0 && (
            <div className="size-8 rounded-full bg-pink-200/50 animate-pulse flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;