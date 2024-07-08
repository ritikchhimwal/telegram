import React, { useEffect, useState } from "react";
import axios from "axios";
import { pp } from "../assets/telegram";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [latestMessages, setLatestMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "https://devapi.beyondchats.com/api/get_all_chats?page=1"
        );
        setChats(response.data.data.data);
        response.data.data.data.forEach((chat) => fetchLatestMessage(chat.id));
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    const fetchLatestMessage = async (chatId) => {
      try {
        const response = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        );
        const messages = response.data.data;
        if (messages.length > 0) {
          setLatestMessages((prev) => ({
            ...prev,
            [chatId]: {
              message: messages[messages.length - 1].message,
              time: messages[messages.length - 1].time, // Assuming 'time' field exists
              unreadCount: messages.filter(msg => !msg.read).length // Count of unread messages
            },
          }));
        }
      } catch (error) {
        console.error(`Error fetching messages for chat ${chatId}:`, error);
      }
    };

    fetchChats();
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.creator.name
      ? chat.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
      : chat.creator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      {filteredChats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center p-4 border-b border-none hover:bg-[#cdd5d8] cursor-pointer"
          onClick={() => onSelectChat(chat.id)}
        >
          <img src={pp} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
          <div className="flex flex-col flex-grow">
            <h4 className="font-semibold text-[#111a21]">
              {chat.creator.name || chat.creator.email}
            </h4>
            <p className="text-sm text-[#8796a1] truncate max-w-[240px]">
              {latestMessages[chat.id]?.message || "No messages yet"}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center justify-center bg-gray-300 rounded-full w-6 h-6 my-2">
              <p className="text-black text-xs">
                {latestMessages[chat.id]?.unreadCount || 0}
              </p>
            </div>
            <p className="text-emerald-500 text-xs">
              {latestMessages[chat.id]?.time || ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
