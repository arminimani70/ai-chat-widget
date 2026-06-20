import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 border-t border-gray-200"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="bg-blue-600 text-white rounded-full p-2 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

export default ChatInput;
