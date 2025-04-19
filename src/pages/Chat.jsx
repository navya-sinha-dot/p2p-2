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

// Add avatar URLs and improve mock data
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
  // {
  //   id: "chat2",
  //   name: "Priya Sharma",
  //   lastMessage: "I'll have the party decorations ready by Friday",
  //   time: "10:45 AM",
  //   unread: 0,
  //   type: "renting",
  //   profilePic: "https://i.pravatar.cc/150?u=priya",
  //   messages: [
  //     {
  //       id: "m4",
  //       sender: "You",
  //       message: "Hi Priya, I'm interested in renting your party decorations",
  //       time: "9:30 AM",
  //     },
  //     {
  //       id: "m5",
  //       sender: "Priya",
  //       message: "Hi there! Sure, when do you need them?",
  //       time: "9:45 AM",
  //       avatar: "https://i.pravatar.cc/150?u=priya",
  //     },
  //     {
  //       id: "m6",
  //       sender: "You",
  //       message: "For next Saturday, is that possible?",
  //       time: "10:15 AM",
  //     },
  //     {
  //       id: "m7",
  //       sender: "Priya",
  //       message: "I'll have the party decorations ready by Friday",
  //       time: "10:45 AM",
  //       avatar: "https://i.pravatar.cc/150?u=priya",
  //     },
  //   ],
  // },
  // {
  //   id: "chat3",
  //   name: "Rahul Verma",
  //   lastMessage: "Thanks for renting my camera, hope it worked well for you!",
  //   time: "Yesterday",
  //   unread: 0,
  //   type: "selling",
  //   profilePic: "https://i.pravatar.cc/150?u=rahul",
  //   messages: [
  //     {
  //       id: "m8",
  //       sender: "Rahul",
  //       message: "Thanks for renting my camera, hope it worked well for you!",
  //       time: "Yesterday",
  //       avatar: "https://i.pravatar.cc/150?u=rahul",
  //     },
  //     {
  //       id: "m9",
  //       sender: "You",
  //       message: "It was perfect! I got some great shots.",
  //       time: "Yesterday",
  //     },
  //   ],
  // },
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
  });

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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

    // Get current time
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Create new message object
    const newMessage = {
      id: `m${Date.now()}`, // Generate unique ID
      sender: "You",
      message: message.trim(),
      time: currentTime,
    };

    // Update the chats state with the new message
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === selectedChat.id) {
          // Update this chat's messages and lastMessage
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: message.trim(),
            time: currentTime,
          };
        }
        return chat;
      })
    );

    // Update the selected chat state to show the new message
    setSelectedChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessage: message.trim(),
      time: currentTime,
    }));

    // Clear the input field
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
              className="w-full md:w-100 border-r border-gray-200 bg-white overflow-hidden flex flex-col"
              initial={{ opacity: 0, x: isMobileView ? -280 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -280 }}
              transition={{ duration: 0.3 }}
            >
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
              <div className="border-b border-gray-200 py-2 px-3">
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

                        {chat.type === "group" && (
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <div className="flex-1 bg-white flex-col m-6 items-center justify-center min-h-screen">
          <div className="flex items-center justify-between mb-6 pl-5 pt-5">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-purple-800">Chat Room</h2>
            </div>
          </div>
          <div className="h-[700px] w-full max-w-5xl border-2 border-white rounded-lg bg-white shadow-lg">
            <div className="h-[600px] overflow-y-auto p-6">
              {messages.map((message, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-purple-100 text-black rounded p-2 m-3"
                >
                  {message}
                </motion.p>
              ))}
            </div>
            <div className="flex p-3 gap-2">
              <input
                ref={msgRef}
                type="text"
                onKeyDown={handleKeyPress}
                className="w-full h-10 border-2 border-gray-300 rounded-lg px-3"
              />
              <button
                className="w-20 h-10 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* <AnimatePresence>
          <motion.div
            className={`flex-1 flex flex-col bg-gray-50 ${
              isMobileView && showChatList ? "hidden" : "block"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {selectedChat ? (
              <>
                <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center shadow-sm">
                  <div className="flex items-center">
                    {isMobileView && (
                      <button
                        onClick={handleBackToList}
                        className="mr-2 text-gray-500 hover:text-purple-600 transition-colors"
                      >
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
                    <button className="text-gray-500 hover:text-purple-600 transition-colors">
                      <Phone size={20} />
                    </button>
                    <button className="text-gray-500 hover:text-purple-600 transition-colors">
                      <Video size={20} />
                    </button>

                    {selectedChat.type === "group" && (
                      <motion.button
                        onClick={openSellModal}
                        className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm flex items-center shadow-md"
                        whileHover={{ scale: 1.05, backgroundColor: "#DB2777" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={16} className="mr-1" />
                        Sell
                      </motion.button>
                    )}

                    <button className="text-gray-500 hover:text-purple-600 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 bg-opacity-60 backdrop-blur-sm">
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
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
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {msg.sender !== "You" && msg.avatar && (
                        <Avatar name={msg.sender} src={msg.avatar} size="sm" />
                      )}

                      <div
                        className={`rounded-2xl p-3 mt-1 ${
                          msg.sender === "You"
                            ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white ml-auto shadow-md"
                            : "bg-white border border-gray-100 ml-2 shadow-sm"
                        }`}
                      >
                        {msg.sender !== "You" && (
                          <p className="text-xs font-medium mb-1 text-purple-600">
                            {msg.sender}
                          </p>
                        )}
                        <p className="break-words">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 text-right ${
                            msg.sender === "You"
                              ? "text-purple-200"
                              : "text-gray-400"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-gray-200 bg-white p-3 shadow-lg">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center bg-gray-50 rounded-full px-3 py-1 border border-gray-200"
                  >
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-purple-500 transition-colors"
                    >
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
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-gray-400"
                      }`}
                      whileHover={message.trim() ? { scale: 1.1 } : {}}
                      whileTap={message.trim() ? { scale: 0.9 } : {}}
                      disabled={!message.trim()}
                    >
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
                <div className="my-4">
                  <input
                    type="text"
                    placeholder="Enter group name"
                    ref={roomNameRef}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200 bg-white"
                  />
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const chat = {
                        id: Math.random(),
                        name: roomNameRef.current.value,
                        lastMessage: "Room joined",
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                        unread: 0,
                        type: "groups",
                        members: [user.name],
                        messages: [],
                      };
                      setChats((prev) => [...prev, chat]);
                      setSelectedChat(chat);
                    }}
                    className="bg-violet-200 text-violet-900 px-4 py-2 rounded-lg hover:bg-violet-400 hover:text-white flex items-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Join Group
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const chat = {
                        id: Math.random(),
                        name: roomNameRef.current.value,
                        lastMessage: "Room created",
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                        unread: 0,
                        type: "groups",
                        members: [user.name],
                        messages: [],
                      };
                      setChats((prev) => [...prev, chat]);
                      setSelectedChat(chat);
                    }}
                    className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    New Group
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence> */}
      </div>
    </Layout>
  );
};

export default Chat;
