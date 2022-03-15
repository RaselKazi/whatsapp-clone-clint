import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
export default function SearchModal({ setSearchOpen }) {
  return (
    <div className=" z-10 bg-gray-800 w-full h-40 absolute right-0 top-0 shadow-2xl">
      <div className=" border-b border-gray-800 px-6 py-2 flex justify-between items-center w-full">
        <button
          className="text-gray-100 w-1/12"
          onClick={() => {
            setSearchOpen(false);
          }}
        >
          <BiSearchAlt2 />
        </button>
        <input
          type="search"
          placeholder="Search..."
          autoFocus="1"
          className="p-2 rounded-lg inline text-gray-200  bg-gray-700 focus:outline-none w-10/12"
        />
      </div>

      <div className=" flex justify-between text-gray-200 text-sm p-3 flex-grow ">
        <a
          href=""
          className="flex items-center justify-between bg-gray-700  px-6 md:px-4 rounded-full py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline align-top"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="mr-2">Photos</span>
        </a>
        <a
          href=""
          className="flex items-center justify-between bg-gray-700  px-6 md:px-4 rounded-full py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline align-top"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          Videos
        </a>
        <a
          href=""
          className="flex items-center justify-between bg-gray-700  px-6 md:px-4 rounded-full py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clipRule="evenodd"
            />
          </svg>
          Links
        </a>
      </div>

      <div className=" flex justify-evenly text-gray-200 text-sm p-3 flex-wrap">
        <a
          href=""
          className="flex items-center justify-between bg-gray-700  px-6 md:px-4 rounded-full py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          GIFs
        </a>
        <a
          href=""
          className="flex items-center justify-between bg-gray-700  px-6 md:px-4 rounded-full py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clipRule="evenodd"
            />
          </svg>
          Audio
        </a>
        <a
          href=""
          className=" flex items-center justify-between bg-gray-700  px-6 md:px-4 rounded-full py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          Documents
        </a>
      </div>
    </div>
  );
}
