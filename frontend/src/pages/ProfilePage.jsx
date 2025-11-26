import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto p-4 py-10">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 space-y-8 border border-white/30 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
            <p className="mt-2 text-gray-600">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white/60 shadow-md transition-transform hover:scale-105"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-white/80 backdrop-blur-sm p-2 rounded-full cursor-pointer shadow-sm flex items-center justify-center transition-transform duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : "hover:scale-110"
                }`}
              >
                <Camera className="w-5 h-5 text-purple-600" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">{isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-500" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-white/70 rounded-xl border border-purple-100 text-gray-800 shadow-sm">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-white/70 rounded-xl border border-purple-100 text-gray-800 shadow-sm">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-gray-800">Account Information</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between py-2 border-b border-white/30">
                <span>Member Since</span>
                <span className="font-medium">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;