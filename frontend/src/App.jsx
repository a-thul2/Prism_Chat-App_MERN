import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div
        data-theme={theme}
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-slate-900" : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
        }`}
      >
        <div className="flex flex-col items-center gap-4 bg-white/80 dark:bg-slate-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <Loader className="w-10 h-10 animate-spin text-purple-600" />
          <p className="text-sm text-gray-700 dark:text-gray-200">Checking authentication...</p>
        </div>
      </div>
    );

  return (
    <div
      data-theme={theme}
      className={`min-h-screen ${
        theme === "dark" ? "bg-slate-900" : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      }`}
    >
      {/* Navbar wrapper to blend with pastel theme */}
      <header className={`sticky top-0 z-40 ${
        theme === "dark" ? "bg-slate-900/60 border-b border-slate-800" : "bg-white/40 border-b border-white/20"
      } backdrop-blur-md shadow-sm`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <Navbar />
        </div>
      </header>

      {/* Main content container */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Toaster />
    </div>
  );
};
export default App;