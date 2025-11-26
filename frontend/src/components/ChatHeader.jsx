import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-purple-100 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-12 rounded-full object-cover ring-2 ring-pink-200/50"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full ring-2 ring-white" />
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-gray-800">{selectedUser.fullName}</h3>
            <p className={`text-sm transition-colors ${
              onlineUsers.includes(selectedUser._id)
                ? "text-green-500 font-medium"
                : "text-gray-400"
            }`}>
              {onlineUsers.includes(selectedUser._id) ? "Online now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-lg hover:bg-purple-100/50 transition-colors text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;