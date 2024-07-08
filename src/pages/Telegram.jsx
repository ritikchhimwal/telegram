// Telegram.jsx

import React, { useState } from 'react';
import LeftMenu from '../components/LeftMenu';
import ChatDetail from '../components/ChatDetail';

const Telegram = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Main app container */}
      <div className="flex justify-start telegram-bp:justify-center items-center bg-[#111a21] h-screen">
        {/* LeftMenu */}
        <div className="bg-[#fcfeff] min-w-[340px] max-w-[500px] h-full">
          <LeftMenu onSelectChat={handleSelectChat} />
        </div>

        {/* ChatDetail */}
        <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-full h-full flex-grow">
          {selectedChat !== null ? (
            <ChatDetail chatId={selectedChat} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-white text-lg">Select a chat from the left menu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Telegram;
