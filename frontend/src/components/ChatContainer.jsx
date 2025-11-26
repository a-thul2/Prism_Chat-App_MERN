import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-pink-50/50 via-purple-50/30 to-blue-50/50">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-pink-50/50 via-purple-50/30 to-blue-50/50">
      <ChatHeader />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex gap-3 ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            {/* Avatar - Left for incoming messages */}
            {message.senderId !== authUser._id && (
              <div className="flex-shrink-0">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="size-8 rounded-full object-cover ring-1 ring-purple-200/50"
                />
              </div>
            )}

            {/* Message Bubble */}
            <div className={`flex flex-col ${message.senderId === authUser._id ? "items-end" : "items-start"}`}>
              {/* Message Content */}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl shadow-sm transition-all duration-200 ${
                  message.senderId === authUser._id
                    ? "bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-br-none"
                    : "bg-white/90 text-gray-800 rounded-bl-none border border-purple-100/50"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[180px] rounded-lg mb-2"
                  />
                )}
                {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
              </div>

              {/* Timestamp */}
              <time className={`text-xs mt-1 px-2 ${
                message.senderId === authUser._id
                  ? "text-purple-400"
                  : "text-gray-400"
              }`}>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            {/* Avatar - Right for outgoing messages */}
            {message.senderId === authUser._id && (
              <div className="flex-shrink-0">
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt={authUser.fullName}
                  className="size-8 rounded-full object-cover ring-1 ring-pink-200/50"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;