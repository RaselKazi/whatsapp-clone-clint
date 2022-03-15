import React from "react";

export default function ChatFooter() {
  return (
    <form
      className="bg-gray-800
          w-full flex justify-center items-center py-2 px-10"
    >
      <div className=" w-24 flex items-center justify-evenly">
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
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className=" relative">
          <input
            type="file"
            className="file:hidden absolute text-transparent text-xs w-1"
            id="hidden-file"
          />
          <label className="text-gray-100 " htmlFor="hidden-file">
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className=" flex justify-between items-center  w-4/6">
        <input
          placeholder="Type something...!"
          className="p-2 px-6 inline text-gray-200 w-full bg-gray-700 rounded-full focus:outline-none"
        />
        <button
          type="submit"
          className=" ml-2 flex items-center justify-center  rounded-full h-10 w-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" rotate-45 text-gray-400 h-6 w-6 inline cursor-pointer hover:text-gray-600 transition duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400 h-7 w-7 inline cursor-pointer hover:text-gray-600 transition duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </div>

      <div className="flex"></div>
    </form>
  );
}
