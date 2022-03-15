import React from "react";
import Image from "next/image";
import avatarIcon from "../public/7.png";
export default function ChatHeader({ setChatOpen, receiver }) {
  return (
    <div
      className=" flex justify-between bg-gray-800
          w-full
          h-16 border-b border-gray-500 "
    >
      <div className="h-16 ml-6 flex items-center">
        <button className="mx-4 md:hidden text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400 h-6 w-6 inline cursor-pointer hover:text-gray-600 transition duration-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Image
          src={avatarIcon}
          className=" bg-gray-700 p-4 rounded-full"
          alt=""
          layout="fixed"
          width={35}
          height={35}
        />
        <p className="mx-4 my-10 py-1 px-4 rounded-lg   text-xl text-gray-100"></p>
      </div>
      <div className="h-16 w-36 mr-6 flex items-center justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400 h-6 w-6 inline cursor-pointer hover:text-gray-600 transition duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400 h-6 w-6 inline cursor-pointer hover:text-gray-600 transition duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400 h-6 w-6 inline cursor-pointer hover:text-gray-600 transition duration-200 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400 h-6 w-6 inline cursor-pointer hover:text-gray-600 transition duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </div>
    </div>
  );
}
