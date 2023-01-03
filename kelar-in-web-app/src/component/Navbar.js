import React from "react";
import { MenuIcon } from "@heroicons/react/outline";

function Navbar() {
  const menu = [
    { name: "Home", current: true },
    { name: "Projects", current: false },
  ];

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-screen h-[70px] bg-secondary-color fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold ml-4 sm:text-4xl">kelar</h1>
          <h1 className="text-3xl font-bold mr-4 text-fourth-color sm:text-4xl">.in</h1>
          <div className="flex ml-3 space-x-4 text-2xl">
            {menu.map((item) => (
              <a
              className={classNames(item.current ? "bg-fourth-color text-secondary-color" : "text-black font-bold hover:bg-third-color hover:text-white", "px-3 py-2 rounded-md text-xl font-bold")}
              >
                {item.name}
                </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
