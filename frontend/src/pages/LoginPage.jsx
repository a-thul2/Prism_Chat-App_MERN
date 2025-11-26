import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-4 sm:p-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-300/60 to-purple-300/60 flex items-center justify-center group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-400 transition-colors" />
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 border-2 border-purple-200/50 focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-200/30 placeholder-gray-400 text-gray-800 transition-all duration-200"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/70 border-2 border-purple-200/50 focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-200/30 placeholder-gray-400 text-gray-800 transition-all duration-200"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-400 hover:text-purple-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold shadow-md hover:shadow-lg hover:from-pink-500 hover:to-purple-500 transform hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative Pattern */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12">
        <div className="max-w-md space-y-8">
          {/* Animated Grid Pattern */}
          <div className="grid grid-cols-3 gap-4">
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
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back!
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Sign in to continue your conversations and catch up with your messages.
            </p>
          </div>

          {/* Decorative Dots */}
          <div className="flex justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-pink-300/70 animate-bounce" />
            <div className="w-3 h-3 rounded-full bg-purple-300/70 animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-3 h-3 rounded-full bg-blue-300/70 animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;