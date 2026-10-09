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
        <Button className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-green-500 hover:text-green-700">
          সাইন ইন
        </Button>
        <Button className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
          সাইন আপ
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
