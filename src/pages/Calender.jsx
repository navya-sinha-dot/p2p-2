import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Plus,
} from "lucide-react";
import Layout from "../components/layout/Layout";

// Enhanced mock reminders data with more realistic details
const initialReminders = [
  {
    id: "1",
    type: "return",
    itemName: "Kids Party Setup for Birthday",
    description: "Full party setup including tables, chairs, and decorations",
    dueDate: "2023-11-15",
    daysLeft: 5,
    ownerName: "Priya Sharma",
    image: "https://images.pexels.com/photos/796605/pexels-photo-796605.jpeg",
    status: "upcoming",
  },
  {
    id: "2",
    type: "receive",
    itemName: "Professional DSLR Camera Kit",
    description: "Canon EOS R5 with 24-70mm lens and accessories",
    dueDate: "2023-11-20",
    daysLeft: 10,
    renterName: "Arjun Mehta",
    image: "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg",
    status: "pending",
  },
  {
    id: "3",
    type: "return",
    itemName: "Vintage Party Dress",
    description: "Elegant red dress, size M with matching accessories",
    dueDate: "2023-11-25",
    daysLeft: 2,
    ownerName: "Neha Kapoor",
    image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg",
    status: "urgent",
  },
  {
    id: "4",
    type: "return",
    itemName: "Camping Equipment Bundle",
    description: "4-person tent, sleeping bags, and portable stove",
    dueDate: "2023-11-30",
    daysLeft: 15,
    ownerName: "Raj Malhotra",
    image: "https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg",
    status: "upcoming",
  },
];

// Generate calendar days with improved implementation
const generateCalendarDays = (year, month, reminders) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const days = [];

  // Previous month days to fill the first row
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = 0; i < firstDay; i++) {
    const day = prevMonthDays - firstDay + i + 1;
    const date = new Date(year, month - 1, day);
    const dateStr = date.toISOString().split("T")[0];
    
    const remindersForDay = reminders.filter(
      (reminder) => reminder.dueDate === dateStr
    );
    
    days.push({ 
      day, 
      isCurrentMonth: false,
      isPrevMonth: true,
      date: dateStr,
      reminders: remindersForDay,
      hasUrgent: remindersForDay.some((r) => r.status === "urgent"),
      hasUpcoming: remindersForDay.some((r) => r.status === "upcoming"),
      hasPending: remindersForDay.some((r) => r.status === "pending"),
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateStr = date.toISOString().split("T")[0];
    const isToday = 
      today.getDate() === i && 
      today.getMonth() === month && 
      today.getFullYear() === year;

    const remindersForDay = reminders.filter(
      (reminder) => reminder.dueDate === dateStr
    );

    days.push({
      day: i,
      isCurrentMonth: true,
      date: dateStr,
      isToday,
      reminders: remindersForDay,
      hasUrgent: remindersForDay.some((r) => r.status === "urgent"),
      hasUpcoming: remindersForDay.some((r) => r.status === "upcoming"),
      hasPending: remindersForDay.some((r) => r.status === "pending"),
    });
  }

  // Next month days to complete the grid
  const totalDaysNeeded = 42; // 6 rows of 7 days
  const remainingDays = totalDaysNeeded - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    const dateStr = date.toISOString().split("T")[0];
    
    const remindersForDay = reminders.filter(
      (reminder) => reminder.dueDate === dateStr
    );
    
    days.push({ 
      day: i, 
      isCurrentMonth: false,
      isNextMonth: true,
      date: dateStr,
      reminders: remindersForDay,
      hasUrgent: remindersForDay.some((r) => r.status === "urgent"),
      hasUpcoming: remindersForDay.some((r) => r.status === "upcoming"),
      hasPending: remindersForDay.some((r) => r.status === "pending"),
    });
  }

  return days;
};

const RentalRemindersPage = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
  const [selectedReminders, setSelectedReminders] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [reminders, setReminders] = useState(initialReminders);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: "return",
    itemName: "",
    description: "",
    dueDate: today.toISOString().split("T")[0],
    daysLeft: 7,
    ownerName: "",
    renterName: "",
    image: "https://images.pexels.com/photos/796605/pexels-photo-796605.jpeg",
    status: "upcoming",
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar days
  const calendarDays = generateCalendarDays(currentYear, currentMonth, reminders);

  // Filter reminders based on selected date and filter status
  useEffect(() => {
    if (selectedDate) {
      let filtered = reminders.filter(
        (reminder) => reminder.dueDate === selectedDate
      );
      
      if (filterStatus) {
        filtered = filtered.filter(r => r.status === filterStatus);
      }
      
      setSelectedReminders(filtered);
    } else {
      setSelectedReminders([]);
    }
  }, [selectedDate, filterStatus, reminders]);

  // Navigation functions
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today.toISOString().split("T")[0]);
  };

  const handleAddReminder = () => {
    // Generate a random ID
    const newId = Math.floor(Math.random() * 10000).toString();
    
    // Calculate days left based on due date
    const dueDate = new Date(newReminder.dueDate);
    const currentDate = new Date();
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Create the new reminder
    const reminderToAdd = {
      ...newReminder,
      id: newId,
      daysLeft: daysLeft,
    };
    
    // Add the new reminder to the list
    setReminders(prev => [...prev, reminderToAdd]);
    
    // Close the modal
    setShowAddReminderModal(false);
    
    // Reset the new reminder form
    setNewReminder({
      type: "return",
      itemName: "",
      description: "",
      dueDate: today.toISOString().split("T")[0],
      daysLeft: 7,
      ownerName: "",
      renterName: "",
      image: "https://images.pexels.com/photos/796605/pexels-photo-796605.jpeg",
      status: "upcoming",
    });
  };

  // Helper function to get status styling
  const getStatusColor = (status) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "urgent":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "upcoming":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "pending":
        return <CalendarIcon className="w-4 h-4 text-purple-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <Layout showSidebar={false}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <motion.div
          className=" from-purple-100 via-purple-100 to-indigo-50 rounded-xl p-6 mb-8 shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-lg shadow-md">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Rental Reminders</h1>
                <p className="text-gray-600 mt-1">Stay on top of your rental schedule</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium">{reminders.length} Active Reminders</span>
              </div>
              <button onClick={goToToday} className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-sm hover:bg-purple-700 transition-colors">
                Today
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar Section - Larger on desktop */}
          <motion.div
            className="lg:col-span-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-xl text-gray-800 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-purple-600" />
                  {monthNames[currentMonth]} {currentYear}
                </h2>

                <div className="flex space-x-2">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {weekdays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    // Determine the background styling
                    let bgClass = "bg-white hover:bg-gray-50";
                    let indicatorClass = "";
                    
                    if (!day.isCurrentMonth) {
                      bgClass = "bg-gray-50 text-gray-300";
                    } else if (day.hasUrgent) {
                      bgClass = "bg-red-50 hover:bg-red-100";
                      indicatorClass = "bg-red-400";
                    } else if (day.hasUpcoming) {
                      bgClass = "bg-yellow-50 hover:bg-yellow-100";
                      indicatorClass = "bg-yellow-400";
                    } else if (day.hasPending) {
                      bgClass = "bg-purple-50 hover:bg-purple-100";
                      indicatorClass = "bg-purple-400";
                    }
                    
                    // Selected date styling
                    const isSelected = selectedDate === day.date;
                    
                    return (
                      <motion.div
                        key={index}
                        className={`
                          min-h-[5rem] p-2 rounded-lg border border-gray-100 transition-colors cursor-pointer
                          ${bgClass}
                          ${isSelected ? "ring-2 ring-purple-500" : ""}
                        `}
                        onClick={() => setSelectedDate(day.date)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className={`
                                text-sm font-medium w-7 h-7 flex items-center justify-center
                                ${day.isToday ? "bg-purple-600 text-white rounded-full" : ""}
                              `}
                            >
                              {day.day}
                            </span>
                            
                            {day.reminders && day.reminders.length > 0 && (
                              <span className="text-xs bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                {day.reminders.length}
                              </span>
                            )}
                          </div>

                          {/* Indicator dots for reminders */}
                          {day.reminders && day.reminders.length > 0 && (
                            <div className="flex space-x-1 mt-auto">
                              {day.reminders.slice(0, 3).map((reminder, i) => (
                                <div
                                  key={i}
                                  className={`
                                    w-2 h-2 rounded-full
                                    ${reminder.status === "urgent" ? "bg-red-400" : 
                                      reminder.status === "upcoming" ? "bg-yellow-400" : "bg-purple-400"}
                                  `}
                                />
                              ))}
                              {day.reminders.length > 3 && (
                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Status legend */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <span className="text-xs text-gray-600">Urgent</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <span className="text-xs text-gray-600">Upcoming</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                    <span className="text-xs text-gray-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected date reminders */}
            {selectedDate && (
              <motion.div 
                className="mt-6 bg-white rounded-xl shadow-sm p-4 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-gray-800">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </h3>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setFilterStatus(null)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${!filterStatus ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setFilterStatus('urgent')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${filterStatus === 'urgent' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Urgent
                    </button>
                    <button 
                      onClick={() => setFilterStatus('upcoming')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${filterStatus === 'upcoming' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Upcoming
                    </button>
                    <button 
                      onClick={() => setFilterStatus('pending')}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${filterStatus === 'pending' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      Pending
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedReminders.length > 0 ? (
                    <div className="space-y-3">
                      {selectedReminders.map((reminder) => (
                        <motion.div
                          key={reminder.id}
                          className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img
                              src={reminder.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{reminder.itemName}</h4>
                            <p className="text-xs text-gray-500">
                              {reminder.type === "return"
                                ? `Return to ${reminder.ownerName}`
                                : `Receive from ${reminder.renterName}`}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(reminder.status)}`}>
                              {reminder.daysLeft} {reminder.daysLeft === 1 ? 'day' : 'days'} left
                            </span>
                            <button className="ml-3 p-2 rounded-full hover:bg-gray-200 transition-colors">
                              <ArrowRight className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700">No reminders for this date</h3>
                      <p className="text-gray-500 mt-1">Select a different date or add a new reminder</p>
                      <button 
                        onClick={() => {
                          setNewReminder(prev => ({...prev, dueDate: selectedDate}));
                          setShowAddReminderModal(true);
                        }}
                        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full text-sm flex items-center justify-center mx-auto"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Reminder
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>

          {/* Reminders Section - Smaller on desktop */}
          <motion.div
            className="lg:col-span-4 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-purple-200 rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-lg text-gray-800">Upcoming Reminders</h2>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    {reminders.length} items
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  {reminders.slice(0, 3).map((reminder) => (
                    <motion.div
                      key={reminder.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="flex">
                        <div className="relative w-24 h-24">
                          <img
                            src={reminder.image}
                            alt={reminder.itemName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <div className="absolute bottom-2 left-2">
                            {getStatusIcon(reminder.status)}
                          </div>
                        </div>

                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-800 mb-1">
                                {reminder.itemName}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {reminder.description.length > 40
                                  ? `${reminder.description.substring(0, 40)}...`
                                  : reminder.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-2 flex items-center">
                                {reminder.type === "return" ? (
                                  <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-3 h-3 mr-1 text-purple-500" />
                                )}
                                {reminder.type === "return"
                                  ? `Return to ${reminder.ownerName}`
                                  : `Receive from ${reminder.renterName}`}
                              </p>
                            </div>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                reminder.status
                              )}`}
                            >
                              {reminder.daysLeft} {reminder.daysLeft === 1 ? 'day' : 'days'} left
                            </span>
                          </div>

                          <div className="mt-3 text-xs text-gray-500">
                            Due: {new Date(reminder.dueDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {reminders.length > 3 && (
                    <motion.button
                      className="w-full py-3 text-center text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View All {reminders.length} Reminders
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <motion.div
              className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-lg text-gray-800">Quick Actions</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg flex flex-col items-center justify-center"
                    onClick={() => setShowAddReminderModal(true)}
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Add Reminder</span>
                  </button>
                  <button className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg flex flex-col items-center justify-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <Bell className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Notifications</span>
                  </button>
                  <button className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg flex flex-col items-center justify-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <CalendarIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Sync Calendar</span>
                  </button>
                  <button className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg flex flex-col items-center justify-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <AlertCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Manage Alerts</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Reminder</h2>
              <button 
                onClick={() => setShowAddReminderModal(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={newReminder.itemName}
                  onChange={(e) => setNewReminder({...newReminder, itemName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter item name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="return">Return</option>
                    <option value="receive">Receive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newReminder.status}
                    onChange={(e) => setNewReminder({...newReminder, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="urgent">Urgent</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {newReminder.type === "return" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                  <input
                    type="text"
                    value={newReminder.ownerName}
                    onChange={(e) => setNewReminder({...newReminder, ownerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter owner name"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Renter Name</label>
                  <input
                    type="text"
                    value={newReminder.renterName}
                    onChange={(e) => setNewReminder({...newReminder, renterName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter renter name"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddReminderModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReminder}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  disabled={!newReminder.itemName || (!newReminder.ownerName && !newReminder.renterName)}
                >
                  Add Reminder
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default RentalRemindersPage;