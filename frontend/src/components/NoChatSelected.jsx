import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-pink-50/50 via-purple-50/30 to-blue-50/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-200/80 to-purple-200/80 flex items-center justify-center animate-bounce shadow-lg">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Welcome to Prism!
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Select a conversation from the sidebar to start messaging and connect with friends.
          </p>
        </div>

        {/* Decoration */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 rounded-full bg-pink-300/60 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-purple-300/60 animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-blue-300/60 animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;