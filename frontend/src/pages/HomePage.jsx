import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="hidden sm:flex">
          <Sidebar />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!selectedUser ? (
            <NoChatSelected />
          ) : (
            <ChatContainer />
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;