 import { useState,useRef,useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [chat]);

  const typeText = (text: string) => {
  let index = 0;
  let currentText = "";

  const interval = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];

      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "bot",
          text: currentText,
        };
        return updated;
      });

      index++;
    } else {
      clearInterval(interval);
      setTyping(false);
    }
  }, 25);
};
  const sendMessage = async () => {
    if (!message) return;

    const userMessage = { sender: "user", text: message };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage.text
        })
      });

      const data = await response.json();

      const botReply = {
        sender: "bot",
        text: data.reply
      };

       setChat((prev) => [...prev, { sender: "bot", text: "" }]);

typeText(botReply.text);

    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Server error. Please try again." }
      ]);
    }

    setTyping(false);
  };

  return (
    <div>
       <div
  style={{
    height: "400px",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
  }}
>
        {chat.map((c, index) => (
          <MessageBubble key={index} sender={c.sender} text={c.text} />
        ))}
        <div ref={chatEndRef}></div>

        {typing && <TypingIndicator />}
      </div>

      <div style={{ display: "flex" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your tax question..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            background: "#198754",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}