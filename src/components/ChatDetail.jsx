

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { pp } from '../assets/telegram';
import bglogo from '../assets/images/bg-logo.jpg'; // 

const ChatDetail = ({ chatId }) => {
  const [chatDetail, setChatDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatDetail = async () => {
      try {
        const response = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        );
        setChatDetail(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching chat detail for chat ${chatId}:`, error);
        setLoading(false);
      }
    };

    fetchChatDetail();
  }, [chatId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col h-screen w-full relative"
      style={{
        backgroundImage: `url(${bglogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header */}
      <div className="flex p-0  bg-white border-b relative z-10">
        <img src={pp} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-semibold text-black">
            {chatDetail.length > 0 ? chatDetail[0].sender.name : 'User'}
          </h3>
          <p className="text-gray-300">
            {chatDetail.length > 0 ? chatDetail[0].sender.phone : 'No phone number'}
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex flex-col flex-grow overflow-y-scroll relative z-10">
        {chatDetail.map((message) => (
          <div key={message.id} className="p-4">
            <div className="flex items-center">
              <img src={pp} alt="Profile" className="w-8 h-8 rounded-full mr-3" />
              <p className="text-gray-100">{message.message}</p>
            </div>
            <p className="text-sm text-gray-300">{message.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatDetail;
