import React from "react";
import Image from "next/image";
import MobileNav from "./MobileNav";
import avatarIcon from "../../public/7.png";
import SidebarHeader from "./SidebarHeader";
export default function Sidebar() {
  return (
    <div className=" sticky h-screen  w-full md:w-1/3 bg-gray-900 border-r border-gray-500 ">
      <SidebarHeader />
      <MobileNav />

      {/* User list */}
      <ul>
        <li className=" z-10">
          <div className="p-3 flex justify-between items-center hover:bg-gray-700">
            <div className="inline-flex items-center">
              <Image
                src={avatarIcon}
                className=" h-10 w-10 rounded-full mr-3"
                alt=""
                layout="fixed"
                width={50}
                height={50}
              />

              <div className="">
                <p className="font-semibold text-white">racel</p>
                <p className="text-gray-200 text-sm">Follow me on Instagram</p>
                <p className="text-green-500 font-semibold text-sm">
                  typing...
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-xs">17:07</p>

              <p className="mx-auto text-center text-white h-5 w-5 rounded-full bg-green-500 text-xs">
                <span className="align-middle">5</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
