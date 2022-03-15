import React, { useState } from "react";
import MenuModal from "../MenuModal";
import SearchModal from "../SearchModal";

export default function SidebarHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <header className="bg-gray-800 w-full h-16 flex justify-between items-center border-b border-gray-500 ">
        {/*  nama */}
        <p className="text-white text-lg font-semibold p-4">WhatsApp</p>
        {/* <!-- button --> */}
        <div className="text-white p-4 ">
          {/* <!-- search button --> */}
          <div className="inline-flex relative">
            <button
              className="h-10 w-10 rounded-full hover:bg-gray-700 text-center"
              onClick={() => {
                setSearchOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
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
            </button>
          </div>

          <div className="inline-flex ">
            {/*menu button*/}
            <button
              className="h-10 w-10 rounded-full hover:bg-gray-700 text-center "
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div>
        {/*search modal*/}
        {searchOpen && (
          <SearchModal setSearchOpen={setSearchOpen}></SearchModal>
        )}

        {/* menu modal*/}
        <div
          className=" bg-gray-800 shadow-2xl h-auto w-48 absolute right-0 top-16"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          {menuOpen && <MenuModal></MenuModal>}
        </div>
      </div>
    </div>
  );
}
