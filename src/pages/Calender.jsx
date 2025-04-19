import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Layout from "../components/layout/Layout";

// Mock reminders data
const reminders = [
  {
    id: "1",
    type: "return",
    itemName: "Kids Party Setup for Birthday",
    dueDate: "2023-11-15",
    daysLeft: 5,
    ownerName: "Priya Sharma",
    image: "https://images.pexels.com/photos/796605/pexels-photo-796605.jpeg",
  },
  {
    id: "2",
    type: "receive",
    itemName: "Professional DSLR Camera Kit",
    dueDate: "2023-11-20",
    daysLeft: 10,
    renterName: "Arjun Mehta",
    image: "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg",
  },
];

// Generate calendar days
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: 0, isCurrentMonth: false });
  }

  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateStr = date.toISOString().split("T")[0];

    const hasReminders = reminders.some(
      (reminder) => reminder.dueDate === dateStr
    );

    days.push({
      day: i,
      isCurrentMonth: true,
      date: dateStr,
      hasReminders,
    });
  }

  return days;
};

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = generateCalendarDays(currentYear, currentMonth);

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

  return (
    <Layout showSidebar={false}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.h1
          className="text-2xl font-bold mb-6 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <CalendarIcon size={24} className="mr-2" />
          Calendar & Reminders
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reminders Section */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="font-bold text-lg mb-4">Upcoming Reminders</h2>

            {reminders.length === 0 ? (
              <p className="text-gray-500">No upcoming reminders</p>
            ) : (
              reminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -3 }}>
                  <div className="flex">
                    <img
                      src={reminder.image}
                      alt={reminder.itemName}
                      className="w-20 h-20 object-cover"
                    />

                    <div className="p-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{reminder.itemName}</h3>
                          <p className="text-sm text-gray-500">
                            {reminder.type === "return"
                              ? "Return to:"
                              : "Receive from:"}{" "}
                            {reminder.type === "return"
                              ? reminder.ownerName
                              : reminder.renterName}
                          </p>
                        </div>

                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reminder.daysLeft <= 3
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {reminder.daysLeft} days left
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Due date:{" "}
                        {new Date(reminder.dueDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Calendar Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  {monthNames[currentMonth]} {currentYear}
                </h2>

                <div className="flex space-x-2">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-1 rounded-full hover:bg-gray-100">
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-1 rounded-full hover:bg-gray-100">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {weekdays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`h-14 p-1 border rounded-md ${
                        !day.isCurrentMonth
                          ? "bg-gray-50 text-gray-300"
                          : day.hasReminders
                          ? "bg-pink-50 border-pink-200"
                          : "hover:bg-gray-50"
                      }`}>
                      <div className="flex justify-between items-start h-full">
                        <span
                          className={`text-sm ${
                            day.date === today.toISOString().split("T")[0]
                              ? "bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                              : ""
                          }`}>
                          {day.day || ""}
                        </span>

                        {day.hasReminders && (
                          <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
