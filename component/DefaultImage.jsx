import React from "react";
import bg from "../public/bgg.png";
import Image from "next/image";
export default function DefaultImage() {
  return (
    <div className="flex justify-center items-center h-full">
      <Image
        src={bg}
        className=""
        alt=""
        layout="fixed"
        width={550}
        height={400}
      />
    </div>
  );
}
