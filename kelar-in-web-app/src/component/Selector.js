import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = ({ selected, setSelected, setLists, lists }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className=" font-medium ">
      <div onClick={() => setOpen(!open)} className={`bg-white w-full p-3 flex items-center justify-between rounded ${!selected ? "text-[#a9a9a9] font-normal" : "text-black"}`}>
        {selected ? (selected?.length > 20 ? selected?.substring(0, 20) + "..." : selected) : "Select User"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul className={`absolute z-50 bg-white mt-2   overflow-y-auto ${open ? "max-h-48 border-blue-400 bg-slate-100" : "max-h-0"} `}>
        <div className="flex justify-center items-center  sticky bg-white">
          <AiOutlineSearch size={18} className="text-gray-400  text-center" />
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value.toLowerCase())} placeholder="Enter Name" className="placeholder-gray-400 focus:ring-0 border-0 w-2/4" />
        </div>
        {lists.map((user) => (
          <li
            key={user}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${user?.toLowerCase() === selected?.toLowerCase() && "bg-sky-600 text-white"}
            ${user?.toLowerCase().includes(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              if (user?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(user);
                setOpen(false);
                setInputValue("");
              }
            }}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
