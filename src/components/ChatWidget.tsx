import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import type { Message } from "../types";

function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi! How can I help you today?" },
  ]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
      <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
        AI Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default ChatWidget;
