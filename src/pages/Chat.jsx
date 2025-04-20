import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Users,
  Tag,
  ShoppingBag,
  Send,
  Image,
  Plus,
  Search,
  MoreVertical,
  Phone,
  Video,
  Clock,
  ChevronLeft,
  Menu,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { useUI } from "../context/UIContext";
import { useAuth } from "../hooks/useAuth";

// Avatar component for consistency
const Avatar = ({ name, src, size = "md" }) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return src ? (
    <div
      className={`${sizes[size]} rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-100`}
    >
      <img src={src} alt={name} className="h-full w-full object-cover" />
    </div>
  ) : (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-medium flex-shrink-0`}
    >
      {initials}
    </div>
  );
};

// Mock chat data
const mockChats = [
  {
    id: "chat1",
    name: "Chat Room",
    lastMessage: "Welcome to the chat room!",
    time: "2:30 PM",
    unread: 2,
    type: "groups",
    members: ["You", "Rahul", "Priya", "+4 others"],
    messages: [
      {
        id: "m1",
        sender: "Rahul",
        message: "Hey everyone! I need some equipment for a weekend shoot.",
        time: "2:15 PM",
        avatar: "https://i.pravatar.cc/150?u=rahul2",
      },
      {
        id: "m2",
        sender: "Priya",
        message: "What specifically are you looking for?",
        time: "2:20 PM",
        avatar: "https://i.pravatar.cc/150?u=priya2",
      },
      {
        id: "m3",
        sender: "Rahul",
        message: "Does anyone have a wide-angle lens for rent?",
        time: "2:30 PM",
        avatar: "https://i.pravatar.cc/150?u=rahul2",
      },
    ],
  },
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState(mockChats);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const roomNameRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const msgRef = useRef(null);
  const wsRef = useRef(null);

  const { openSellModal } = useUI();

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // WebSocket setup
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: "1" },
        })
      );
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
      mockChats[0].lastMessage = event.data;
    };

    return () => {
      ws.close();
    };
  }, []);

  // Send message handler
  const handleSend = () => {
    const message = msgRef.current?.value;
    if (message) {
      wsRef.current?.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: message,
          },
        })
      );
      msgRef.current.value = "";
      mockChats[0].lastMessage = message;
    }
  };

  // Handle Enter key press for sending messages
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Filter chats based on active tab and search query
  const filteredChats = chats.filter((chat) => {
    const matchesTab = activeTab === "all" || chat.type === activeTab;
    const matchesSearch =
      !searchQuery ||
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Handle viewport changes and set mobile view state
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);

      // On larger screens, always show chat list
      if (!isMobile) {
        setShowChatList(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar visibility for mobile
  const toggleSidebar = () => {
    setShowChatList((prev) => !prev);
  };

  return (
    <Layout showSidebar={false}>
      <div className="h-[calc(100vh-125px)] flex overflow-hidden bg-gray-50 w-full relative">
        {/* Mobile Toggle Button - Only visible on mobile */}
        {isMobileView && !showChatList && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-20 bg-purple-600 text-white p-2 rounded-full shadow-lg"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Chat List Sidebar - Conditionally shown based on screen size and state */}
        <AnimatePresence>
          {(showChatList || !isMobileView) && (
            <motion.div
              className={`${
                isMobileView ? "absolute left-0 top-0 z-10 h-full" : "relative"
              } w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white overflow-hidden flex flex-col`}
              initial={{ opacity: 0, x: isMobileView ? -280 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -280 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header with close button for mobile */}
              {isMobileView && (
                <div className="flex justify-between items-center p-3 border-b border-gray-200">
                  <h2 className="font-bold text-lg text-purple-800">
                    Chat Rooms
                  </h2>
                  <button
                    onClick={toggleSidebar}
                    className="text-gray-500 hover:text-purple-600"
                  >
                    <ChevronLeft size={24} />
                  </button>
                </div>
              )}

              {/* Search bar */}
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-10 pr-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 py-1 md:py-2 px-2 md:px-3">
                <div className="flex p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setActiveTab("groups")}
                    className={`flex items-center justify-center flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "groups"
                        ? "bg-purple-700 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Users size={16} className="mr-2" />
                    Groups
                  </button>
                  <button
                    onClick={() => setActiveTab("renting")}
                    className={`flex items-center justify-center flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "renting"
                        ? "bg-purple-700 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Tag size={16} className="mr-2" />
                    Renting
                  </button>
                  <button
                    onClick={() => setActiveTab("selling")}
                    className={`flex items-center justify-center flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "selling"
                        ? "bg-purple-700 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Selling
                  </button>
                </div>
              </div>

              {/* Chat list */}
              <div className="overflow-y-auto flex-grow">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      onClick={() => {
                        setSelectedChat(chat);
                        if (isMobileView) setShowChatList(false);
                      }}
                      className={`p-3 cursor-pointer border-b border-gray-100 flex items-center ${
                        selectedChat?.id === chat.id
                          ? "bg-purple-50"
                          : "hover:bg-gray-50"
                      }`}
                      whileHover={{ backgroundColor: "#FDF2F8" }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Avatar
                        name={chat.name}
                        src={chat.profilePic}
                        size="md"
                      />

                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-900 truncate">
                            {chat.name}
                          </h3>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock size={12} className="mr-1" />
                            {chat.time}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-gray-600 truncate max-w-[70%]">
                            {chat.lastMessage}
                          </p>

                          {chat.unread > 0 && (
                            <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full shadow-sm">
                              {chat.unread}
                            </span>
                          )}
                        </div>

                        {chat.type === "groups" && (
                          <div className="flex items-center mt-1">
                            <Users size={12} className="text-purple-500 mr-1" />
                            <p className="text-xs text-gray-500 truncate">
                              {chat.members.join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <MessageCircle
                      size={40}
                      className="mx-auto text-gray-300 mb-2"
                    />
                    <p>No chats found</p>
                  </div>
                )}
              </div>

              {/* Create New Group Room - Input and buttons for chat sidebar */}
              <div className="p-3 border-t border-gray-200">
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Enter group name"
                    ref={roomNameRef}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200 bg-white"
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (!roomNameRef.current?.value) return;
                      const chat = {
                        id: `chat-${Date.now()}`,
                        name: roomNameRef.current.value,
                        lastMessage: "Room joined",
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                        unread: 0,
                        type: "groups",
                        members: [user?.name || "You"],
                        messages: [],
                      };
                      setChats((prev) => [...prev, chat]);
                      setSelectedChat(chat);
                      if (isMobileView) setShowChatList(false);
                    }}
                    className="flex-1 text-sm bg-purple-600 text-white px-2 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-1"
                  >
                    <Plus size={16} />
                    New Group
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window - Always shown but adapts to full width on mobile */}
        <div
          className={`flex-1 bg-white flex flex-col ${
            isMobileView && showChatList ? "hidden" : "flex"
          }`}
        >
          <div className="flex items-center justify-between mb-2 border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              {isMobileView && !showChatList && (
                <button
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-purple-600 transition-colors mr-2"
                >
                  <Menu size={24} />
                </button>
              )}
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-purple-800">Chat Room</h2>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-3 md:p-6"
            ref={messagesEndRef}
            style={{ minHeight: "300px" }}
          >
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-purple-100 text-black rounded p-2 m-3"
                >
                  {message}
                </motion.p>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <MessageCircle size={40} className="text-gray-300 mb-3" />
                <p>No messages yet. Start a conversation!</p>
              </div>
            )}
          </div>

          <div className="flex p-3 gap-2 border-t border-gray-200">
            <input
              ref={msgRef}
              type="text"
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="w-full h-10 border-2 border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              className="w-20 h-10 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center justify-center"
              onClick={handleSend}
            >
              <Send size={18} className="mr-1" />
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
