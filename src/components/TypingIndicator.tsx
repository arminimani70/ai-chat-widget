function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
        <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
}

export default TypingIndicator;
