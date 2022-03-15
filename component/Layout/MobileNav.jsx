import React from "react";

export default function MobileNav() {
  return (
    <div className="flex md:hidden text-center text-sm font-semibold w-full h-10 bg-gray-900 text-white">
      <div className="w-1/12 text-center flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline mx-auto text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="w-11/12 h-auto flex justify-between items-center shadow-2xl">
        <a className="flex items-center text-center w-4/12 border-b-4 border-gray-400 h-full">
          <p className="mx-auto">CHATS</p>
        </a>
        <a className="flex items-center text-center w-4/12 border-b-2 border-gray-400 h-full">
          <p className="mx-auto opacity-25">STATUS</p>
        </a>
        <a className="flex items-center text-center w-4/12 border-b-2 border-gray-400 h-full">
          <p className="mx-auto opacity-25">CALLS</p>
        </a>
      </div>
    </div>
  );
}
