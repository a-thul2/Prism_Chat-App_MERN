import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* form column */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-300 to-purple-300 shadow-md mb-3 transform transition-transform duration-300 hover:scale-105">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
              <p className="text-sm text-gray-500 mt-1">Join our community — fast, secure, and friendly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-purple-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-purple-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white border border-purple-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 transition"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <span className="inline-flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Creating...</span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-purple-600 font-medium hover:underline">Sign in</Link>
            </div>
          </div>
        </div>
      </div>

      {/* right side pattern */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;