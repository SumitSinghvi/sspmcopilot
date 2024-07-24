// @ts-nocheck

import { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./ui/button";
import { LuPaintbrush } from "react-icons/lu";
import { AiOutlineEnter } from "react-icons/ai";
import { Textarea } from "./ui/textarea";

type MessageProps = {
  role: string;
  text: string;
};

const UserMessage = ({ text }: { text: string }) => {
  return <div className={styles.userMessage}>{text}</div>;
};

const AssistantMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.assistantMessage}>
      <Markdown
        children={text}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

const Message = ({ role, text }: MessageProps) => {
  switch (role) {
    case "user":
      return <UserMessage text={text} />;
    case "assistant":
      return <AssistantMessage text={text} />;
    default:
      return null;
  }
};

export default function Chat({
  instructions,
  model,
}: {
  instructions: any;
  model: any;
}) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "system", content: instructions },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatHistory]);

  const sendMessage = async (message: any) => {
    // Append user message to chat history
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    // Send the user's message to  the server
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/generate?endpoint=chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, instructions }),
      }
    );

    const data = await response.json();
    if (data.success) {
      // Open a connection to receive streamed responses
      const eventSource = new EventSource(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/generate?endpoint=stream&model=${model}`
      );
      eventSource.onmessage = function (event) {
        // Parse the event data, which is a JSON string
        const parsedData = JSON.parse(event.data);
        // Check if the last message in the chat history is from the assistant
        setChatHistory((prevChatHistory) => {
          const newChatHistory = [...prevChatHistory];
          if (
            newChatHistory.length > 0 &&
            newChatHistory[newChatHistory.length - 1].role === "assistant"
          ) {
            // Create a new object for the last message to ensure state update
            newChatHistory[newChatHistory.length - 1] = {
              ...newChatHistory[newChatHistory.length - 1],
              content:
                newChatHistory[newChatHistory.length - 1].content + parsedData,
            };
          } else {
            newChatHistory.push({ role: "assistant", content: parsedData });
          }
          return newChatHistory;
        });
      };
      eventSource.onerror = function () {
        eventSource.close();
      };
    }
  };

  const clearChat = async () => {
    // Clear the chat history in the client state
    setChatHistory([{ role: "system", content: instructions }]);

    // Reset the chat history on the server
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/generate?endpoint=reset`,
      { method: "POST" }
    );
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (!message.trim()) return;
    sendMessage(message.trim());
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col">
      <h1>Thread</h1>
      <div className={styles.chatContainer} ref={messagesEndRef}>
        {chatHistory.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg.content} />
        ))}
      </div>
      <div>
        <form onSubmit={onSubmit} className="relative flex w-full">
          <Textarea
            className="outline-none bg-gray-500 border-none flex-1 resize-none"
            name="message"
            placeholder="Type your message here..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Textarea>
          <div className="flex gap-3 items-center absolute bottom-3 right-3">
            <button type="button" onClick={clearChat}>
              <LuPaintbrush size={25} />
            </button>
            <Button
              className="bg-[#1A7F64] text-white py-1 px-3 text-xs flex items-center gap-3 justify-between"
              type="submit"
            >
              Run{" "}
              <span className="border p-1 border-white flex gap-1 rounded">
                Ctrl <AiOutlineEnter />
              </span>
            </Button>
          </div>
        </form>
        <p className="text-gray-500 text-center w-full mt-2">
          This is your playground, feel free to ask any question you want.
        </p>
      </div>
    </div>
  );
}
