// LeftMenu.jsx

import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import ChatList from './ChatList';

function LeftMenu({ onSelectChat }) {
  return (
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      {/* Search and filter */}
      <div className="flex justify-between items-center h-[60px] p-2">
        {/* Filter button */}
        <button className="text-2xl m-2 p-1 rounded-full hover:bg-[#cdd5d8]">
          <RxHamburgerMenu />
        </button>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search"
          className="rounded-full bg-[#cdd5d8] text-[#8796a1] text-sm font-light outline-none px-4 py-2 w-[400px] h-[35px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
        />
      </div>
      {/* Chats */}
      <div className="overflow-y-scroll">
        <ChatList onSelectChat={onSelectChat} />
      </div>
    </div>
  );
}

export default LeftMenu;
