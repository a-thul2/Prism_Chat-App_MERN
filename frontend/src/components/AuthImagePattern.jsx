const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-blue-100/50 p-12">
      <div className="max-w-md text-center space-y-8">
        {/* Animated Grid Pattern */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-3xl bg-gradient-to-br ${
                i % 3 === 0
                  ? "from-pink-200/60 to-pink-300/40"
                  : i % 3 === 1
                  ? "from-purple-200/60 to-purple-300/40"
                  : "from-blue-200/60 to-blue-300/40"
              } backdrop-blur-sm border border-white/50 shadow-sm ${
                i % 2 === 0 ? "animate-pulse" : "animate-bounce"
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">{subtitle}</p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-3 pt-4">
          <div className="w-3 h-3 rounded-full bg-pink-300/70 animate-bounce" />
          <div className="w-3 h-3 rounded-full bg-purple-300/70 animate-bounce delay-100" />
          <div className="w-3 h-3 rounded-full bg-blue-300/70 animate-bounce delay-200" />
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;