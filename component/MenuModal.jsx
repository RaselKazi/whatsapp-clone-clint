import React from "react";
const MenuList = [
  "New group",
  "New broadcast",
  "Linked devices",
  "Starred messages",
  "Settings",
];
export default function MenuModal() {
  return (
    <ul className=" text-gray-200 ">
      <li className="py-2 px-4 bg-gray-800 hover:bg-gray-700 border-b border-gray-900">
        New group
      </li>
      <li className="py-2 px-4 bg-gray-800 hover:bg-gray-700 border-b border-gray-900">
        New broadcast
      </li>
      <li
        className="py-2 px-4 bg-gray-800 hover:bg-gray-700 border-b border-gray-900"
        // onClick={handelLogOut}
      >
        log out
      </li>
    </ul>
  );
}
