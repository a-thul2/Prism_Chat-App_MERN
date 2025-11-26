import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full border-t border-purple-100 bg-white/80 backdrop-blur-sm">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-purple-200/50 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-300 
              flex items-center justify-center shadow-md hover:bg-red-400 transition-colors"
              type="button"
            >
              <X className="size-4 text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-full bg-white/60 border border-purple-200/50 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-200/50 placeholder-gray-400 text-gray-800 transition-all text-sm"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`p-2.5 rounded-full transition-all duration-200 ${
              imagePreview
                ? "bg-green-300/40 text-green-600 ring-1 ring-green-300/50"
                : "hover:bg-purple-100/50 text-gray-400 hover:text-purple-500"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className={`p-2.5 rounded-full transition-all duration-200 ${
            !text.trim() && !imagePreview
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-300 to-purple-300 text-white hover:shadow-lg transform hover:scale-105"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;