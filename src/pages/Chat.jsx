import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Users,
  Tag,
  ShoppingBag,
  Send,
  Image,
  Plus,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { useUI } from "../context/UIContext";

// Mock chat data
const mockChats = [
  {
    id: "chat1",
    name: "Camera Equipment Group",
    lastMessage: "Does anyone have a wide-angle lens for rent?",
    time: "2:30 PM",
    unread: 2,
    type: "group",
    members: ["You", "Rahul", "Priya", "+4 others"],
    messages: [
      {
        id: "m1",
        sender: "Rahul",
        message: "Hey everyone! I need some equipment for a weekend shoot.",
        time: "2:15 PM",
      },
      {
        id: "m2",
        sender: "Priya",
        message: "What specifically are you looking for?",
        time: "2:20 PM",
      },
      {
        id: "m3",
        sender: "Rahul",
        message: "Does anyone have a wide-angle lens for rent?",
        time: "2:30 PM",
      },
    ],
  },
  {
    id: "chat2",
    name: "Priya Sharma",
    lastMessage: "I'll have the party decorations ready by Friday",
    time: "10:45 AM",
    unread: 0,
    type: "renting",
    profilePic: "https://i.pravatar.cc/150?u=priya",
    messages: [
      {
        id: "m4",
        sender: "You",
        message: "Hi Priya, I'm interested in renting your party decorations",
        time: "9:30 AM",
      },
      {
        id: "m5",
        sender: "Priya",
        message: "Hi there! Sure, when do you need them?",
        time: "9:45 AM",
      },
      {
        id: "m6",
        sender: "You",
        message: "For next Saturday, is that possible?",
        time: "10:15 AM",
      },
      {
        id: "m7",
        sender: "Priya",
        message: "I'll have the party decorations ready by Friday",
        time: "10:45 AM",
      },
    ],
  },
  {
    id: "chat3",
    name: "Rahul Verma",
    lastMessage: "Thanks for renting my camera, hope it worked well for you!",
    time: "Yesterday",
    unread: 0,
    type: "selling",
    profilePic: "https://i.pravatar.cc/150?u=rahul",
    messages: [
      {
        id: "m8",
        sender: "Rahul",
        message: "Thanks for renting my camera, hope it worked well for you!",
        time: "Yesterday",
      },
      {
        id: "m9",
        sender: "You",
        message: "It was perfect! I got some great shots.",
        time: "Yesterday",
      },
    ],
  },
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [selectedChat, setSelectedChat] = useState < any > null;
  const [message, setMessage] = useState("");
  const { openSellModal } = useUI();

  const filteredChats = mockChats.filter((chat) => {
    if (activeTab === "groups") return chat.type === "group";
    if (activeTab === "renting") return chat.type === "renting";
    if (activeTab === "selling") return chat.type === "selling";
    return true;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, this would send the message to the API
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <Layout showSidebar={false}>
      <div className="h-[calc(100vh-64px)] flex">
        {/* Chat List */}
        <motion.div
          className="w-80 border-r border-gray-200 bg-white overflow-y-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}>
          <div className="border-b border-gray-200">
            <div className="flex p-3">
              <button
                onClick={() => setActiveTab("groups")}
                className={`flex items-center justify-center flex-1 py-2 rounded-l-md ${
                  activeTab === "groups"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}>
                <Users size={18} className="mr-2" />
                Groups
              </button>
              <button
                onClick={() => setActiveTab("renting")}
                className={`flex items-center justify-center flex-1 py-2 ${
                  activeTab === "renting"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}>
                <Tag size={18} className="mr-2" />
                Renting
              </button>
              <button
                onClick={() => setActiveTab("selling")}
                className={`flex items-center justify-center flex-1 py-2 rounded-r-md ${
                  activeTab === "selling"
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}>
                <ShoppingBag size={18} className="mr-2" />
                Selling
              </button>
            </div>
          </div>

          <div className="p-3">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-3 rounded-md cursor-pointer mb-2 ${
                  selectedChat?.id === chat.id
                    ? "bg-pink-50"
                    : "hover:bg-gray-50"
                }`}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}>
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage}
                </p>

                {chat.unread > 0 && (
                  <div className="flex justify-end mt-1">
                    <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">
                      {chat.unread}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          className="flex-1 flex flex-col bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="font-bold">{selectedChat.name}</h2>
                  {selectedChat.type === "group" && (
                    <p className="text-xs text-gray-500">
                      {selectedChat.members.join(", ")}
                    </p>
                  )}
                </div>

                {selectedChat.type === "group" && (
                  <motion.button
                    onClick={openSellModal}
                    className="bg-pink-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Plus size={16} className="mr-1" />
                    Sell
                  </motion.button>
                )}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === "You"
                        ? "ml-auto bg-pink-500 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}>
                    {msg.sender !== "You" && (
                      <p className="text-xs font-medium mb-1 text-gray-800">
                        {msg.sender}
                      </p>
                    )}
                    <p>{msg.message}</p>
                    <p
                      className={`text-xs mt-1 text-right ${
                        msg.sender === "You" ? "text-pink-200" : "text-gray-500"
                      }`}>
                      {msg.time}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 bg-white p-3">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-pink-500">
                    <Image size={20} />
                  </button>

                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 py-2 px-3 border-none focus:outline-none"
                  />

                  <motion.button
                    type="submit"
                    className="p-2 text-pink-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!message.trim()}>
                    <Send size={20} />
                  </motion.button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <MessageCircle size={48} className="text-gray-300 mb-4" />
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                No chat selected
              </h2>
              <p className="text-gray-500 text-center max-w-md">
                Select a chat from the left panel or start a new conversation
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Chat;
