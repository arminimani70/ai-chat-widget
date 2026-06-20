import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import type { Message } from "../types";
import TypingIndicator from "./TypingIndicator";

function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi! How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
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
    <div className="w-full max-w-md h-[600px] bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 flex flex-col overflow-hidden">
      <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
          AI
        </div>
        <div>
          <p className="text-zinc-100 font-medium text-sm">AI Assistant</p>
          <p className="text-zinc-500 text-xs">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-zinc-950">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default ChatWidget;
