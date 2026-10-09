import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import CategoryNav from "./CategoryNav";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="flex justify-between p-4">
      <div className="flex items-center gap-2">
        <Image
          className="bg-green-600 rounded-xl"
          src="/logo-icon.png"
          alt="alt"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <h2>বাজার দর</h2>
          <p> {date} </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="bg-white text-black border rounded-sm">
          সাইন ইন
        </Button>
        <Button className="bg-green-700 text-white rounded-sm">সাইন আপ</Button>
      </div>
     
    </header>
    
  );
};

export default Navbar;
