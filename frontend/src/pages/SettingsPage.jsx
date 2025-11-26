import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-6">
          {/* Theme Section Card */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/30 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Theme</h2>
                <p className="text-sm text-gray-600">Choose a theme for your chat interface</p>
              </div>
              <div className="mt-2 sm:mt-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 w-full">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-transform transform hover:scale-105 focus:scale-105 ${
                      theme === t ? "ring-2 ring-pink-300/60 bg-white/60" : "hover:bg-white/30"
                    }`}
                    onClick={() => setTheme(t)}
                    aria-label={`Select theme ${t}`}
                  >
                    <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                        <div className="rounded bg-gradient-to-br from-pink-300 to-pink-200"></div>
                        <div className="rounded bg-gradient-to-br from-purple-300 to-purple-200"></div>
                        <div className="rounded bg-gradient-to-br from-blue-300 to-blue-200"></div>
                        <div className="rounded bg-gradient-to-br from-green-200 to-green-100"></div>
                      </div>
                    </div>
                    <span className="text-xs font-medium truncate w-full text-center text-gray-700">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings toggles card */}
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">Enable notifications</div>
                  <div className="text-xs text-gray-500">Receive push notifications for new messages</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-pink-300 peer-focus:ring-4 peer-focus:ring-pink-200/40 transition-all"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform" />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">Show online status</div>
                  <div className="text-xs text-gray-500">Allow others to see when you're online</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-purple-300 peer-focus:ring-4 peer-focus:ring-purple-200/40 transition-all"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform" />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">Auto-download images</div>
                  <div className="text-xs text-gray-500">Save bandwidth by disabling automatic downloads</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-300 peer-focus:ring-4 peer-focus:ring-blue-200/40 transition-all"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform" />
                </label>
              </div>
            </div>
          </div>

          {/* Preview Section Card */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Preview</h3>
            <div className="rounded-xl overflow-hidden bg-white/60 shadow-sm">
              <div className="p-4">
                <div className="max-w-lg mx-auto">
                  {/* Mock Chat UI */}
                  <div className="rounded-xl overflow-hidden">
                    {/* Chat Header */}
                    <div className="px-4 py-3 border-b border-white/30 bg-white/70">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white font-medium">J</div>
                        <div>
                          <h3 className="font-medium text-sm text-gray-800">John Doe</h3>
                          <p className="text-xs text-gray-500">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-white/70">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${message.isSent ? "bg-pink-300 text-white" : "bg-white/80 text-gray-800"}`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-white/70" : "text-gray-500"}`}>12:00 PM</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-white/30 bg-white/70">
                      <div className="flex gap-2">
                        <input type="text" className="flex-1 rounded-lg px-3 py-2 border border-white/30 bg-white/50" placeholder="Type a message..." value="This is a preview" readOnly />
                        <button className="inline-flex items-center justify-center rounded-lg px-3 bg-pink-300 text-white">
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;