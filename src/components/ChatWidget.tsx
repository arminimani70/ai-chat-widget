import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import type { Message } from "../types";

function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi! How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: Date.now().toString() + "-ai",
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        role: "assistant",
        content: "Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="bg-gray-100 text-gray-400 px-4 py-2 rounded-2xl text-sm rounded-bl-sm">
              Typing...
            </div>
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatWidget;
