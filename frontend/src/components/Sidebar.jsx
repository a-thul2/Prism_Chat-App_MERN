import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-72 bg-white/80 backdrop-blur-sm border-r border-purple-100 flex flex-col transition-all duration-200 shadow-sm">
      {/* Header */}
      <div className="border-b border-purple-100 w-full p-4 bg-gradient-to-r from-pink-100/50 to-purple-100/50">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-pink-300 to-purple-300">
            <Users className="size-5 text-white" />
          </div>
          <span className="font-semibold text-gray-800">Contacts</span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-purple-400 cursor-pointer"
            />
            <span className="text-sm text-gray-600">Online only</span>
          </label>
          <span className="text-xs text-purple-500 font-medium">({onlineUsers.length - 1})</span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2 flex-1 space-y-1 px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-xl
              transition-all duration-200 group
              ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-pink-200/60 to-purple-200/60 shadow-md"
                  : "hover:bg-purple-50/50"
              }
            `}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full ring-2 ring-purple-100/50 group-hover:ring-pink-200/50 transition-all"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* User info */}
            <div className="flex-1 text-left min-w-0">
              <div className="font-medium text-gray-800 truncate text-sm">{user.fullName}</div>
              <div className={`text-xs transition-colors ${
                onlineUsers.includes(user._id)
                  ? "text-green-500 font-medium"
                  : "text-gray-400"
              }`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-sm">No users available</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;