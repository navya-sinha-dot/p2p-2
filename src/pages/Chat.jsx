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
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { useUI } from "../context/UIContext";

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
      className={`${sizes[size]} rounded-full overflow-hidden flex-shrink-0 border-2 border-pink-100`}>
      <img src={src} alt={name} className="h-full w-full object-cover" />
    </div>
  ) : (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-medium flex-shrink-0`}>
      {initials}
    </div>
  );
};

// Add avatar URLs and improve mock data
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
        avatar: "https://i.pravatar.cc/150?u=priya",
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
        avatar: "https://i.pravatar.cc/150?u=priya",
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
        avatar: "https://i.pravatar.cc/150?u=rahul",
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
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const messagesEndRef = useRef(null);
  const { openSellModal } = useUI();

  // Filter chats based on active tab and search query
  const filteredChats = mockChats.filter((chat) => {
    const matchesTab = activeTab === "all" || chat.type === activeTab;

    const matchesSearch =
      !searchQuery ||
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Handle viewport changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Show only chat window on mobile when chat is selected
  useEffect(() => {
    if (isMobileView && selectedChat) {
      setShowChatList(false);
    } else {
      setShowChatList(true);
    }
  }, [selectedChat, isMobileView]);

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, this would send the message to the API
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  const formatTime = (timeString) => {
    return timeString; // In a real app, you would format the time properly
  };

  return (
    <Layout showSidebar={false}>
      <div className="h-[calc(100vh-64px)] flex overflow-hidden bg-gray-50">
        {/* Chat List */}
        <AnimatePresence>
          {(showChatList || !isMobileView) && (
            <motion.div
              className="w-full md:w-80 border-r border-gray-200 bg-white overflow-hidden flex flex-col"
              initial={{ opacity: 0, x: isMobileView ? -280 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -280 }}
              transition={{ duration: 0.3 }}>
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
                    className="w-full py-2 pl-10 pr-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 py-2 px-3">
                <div className="flex p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setActiveTab("groups")}
                    className={`flex items-center justify-center flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "groups"
                        ? "bg-purple-700 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}>
                    <Users size={16} className="mr-2" />
                    Groups
                  </button>
                  <button
                    onClick={() => setActiveTab("renting")}
                    className={`flex items-center justify-center flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "renting"
                        ? "bg-purple-700 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}>
                    <Tag size={16} className="mr-2" />
                    Renting
                  </button>
                  <button
                    onClick={() => setActiveTab("selling")}
                    className={`flex items-center justify-center flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "selling"
                        ? "bg-purple-700 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}>
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
                          ? "bg-pink-50"
                          : "hover:bg-gray-50"
                      }`}
                      whileHover={{ backgroundColor: "#FDF2F8" }}
                      whileTap={{ scale: 0.99 }}>
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
                            <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full shadow-sm">
                              {chat.unread}
                            </span>
                          )}
                        </div>

                        {chat.type === "group" && (
                          <div className="flex items-center mt-1">
                            <Users size={12} className="text-pink-500 mr-1" />
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          <motion.div
            className={`flex-1 flex flex-col bg-gray-50 ${
              isMobileView && showChatList ? "hidden" : "block"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center shadow-sm">
                  <div className="flex items-center">
                    {isMobileView && (
                      <button
                        onClick={handleBackToList}
                        className="mr-2 text-gray-500 hover:text-pink-600 transition-colors">
                        <ChevronLeft size={24} />
                      </button>
                    )}

                    <Avatar
                      name={selectedChat.name}
                      src={selectedChat.profilePic}
                      size="md"
                    />

                    <div className="ml-3">
                      <h2 className="font-bold text-gray-900">
                        {selectedChat.name}
                      </h2>
                      {selectedChat.type === "group" && (
                        <p className="text-xs text-gray-500">
                          {selectedChat.members.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-pink-600 transition-colors">
                      <Phone size={20} />
                    </button>
                    <button className="text-gray-500 hover:text-pink-600 transition-colors">
                      <Video size={20} />
                    </button>

                    {selectedChat.type === "group" && (
                      <motion.button
                        onClick={openSellModal}
                        className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm flex items-center shadow-md"
                        whileHover={{ scale: 1.05, backgroundColor: "#DB2777" }}
                        whileTap={{ scale: 0.95 }}>
                        <Plus size={16} className="mr-1" />
                        Sell
                      </motion.button>
                    )}

                    <button className="text-gray-500 hover:text-pink-600 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 bg-opacity-60 backdrop-blur-sm">
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                      {formatTime(selectedChat.messages[0]?.time || "Today")}
                    </span>
                  </div>

                  {selectedChat.messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      className={`max-w-xs ${
                        msg.sender === "You" ? "ml-auto" : "flex items-end"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}>
                      {msg.sender !== "You" && msg.avatar && (
                        <Avatar name={msg.sender} src={msg.avatar} size="sm" />
                      )}

                      <div
                        className={`rounded-2xl p-3 mt-1 ${
                          msg.sender === "You"
                            ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white ml-auto shadow-md"
                            : "bg-white border border-gray-100 ml-2 shadow-sm"
                        }`}>
                        {msg.sender !== "You" && (
                          <p className="text-xs font-medium mb-1 text-pink-600">
                            {msg.sender}
                          </p>
                        )}
                        <p className="break-words">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 text-right ${
                            msg.sender === "You"
                              ? "text-pink-200"
                              : "text-gray-400"
                          }`}>
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 bg-white p-3 shadow-lg">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center bg-gray-50 rounded-full px-3 py-1 border border-gray-200">
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-pink-500 transition-colors">
                      <Image size={20} />
                    </button>

                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 py-2 px-3 bg-transparent border-none focus:outline-none text-gray-700"
                    />

                    <motion.button
                      type="submit"
                      className={`p-2 rounded-full ${
                        message.trim()
                          ? "bg-pink-600 text-white shadow-sm"
                          : "text-gray-400"
                      }`}
                      whileHover={message.trim() ? { scale: 1.1 } : {}}
                      whileTap={message.trim() ? { scale: 0.9 } : {}}
                      disabled={!message.trim()}>
                      <Send size={18} />
                    </motion.button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="bg-gray-100 p-6 rounded-full mb-6">
                  <MessageCircle size={48} className="text-purple-700" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Start a conversation
                </h2>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Select a chat from the left panel or start a new conversation
                  to connect with others
                </p>
                <motion.button
                  onClick={() => setActiveTab("groups")}
                  className="bg-purple-700 text-white px-6 py-3 rounded-full font-medium shadow-lg flex items-center"
                  whileHover={{ scale: 1.05, backgroundColor: "#DB2777" }}
                  whileTap={{ scale: 0.95 }}>
                  <MessageCircle size={20} className="mr-2 bg-purple-700" />
                  Browse groups
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Chat;
