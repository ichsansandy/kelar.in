import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = ({selected, setSelected}) => {
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);


  return (
    <div className=" font-medium ">
      <div onClick={() => setOpen(!open)} className={`bg-white w-full p-3 flex items-center justify-between rounded ${!selected && "text-gray-700"}`}>
        {selected ? (selected?.length > 20 ? selected?.substring(0, 20) + "..." : selected) : "Select Country"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul className={`absolute z-50 bg-white mt-2 overflow-y-auto ${open ? "max-h-48" : "max-h-0"} `}>
        <div className="flex justify-center items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value.toLowerCase())} placeholder="Enter country name" className="focus:ring-0 border-0" />
        </div>
        {countries?.map((country) => (
          <li
            key={country?.name}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${country?.name?.toLowerCase() === selected?.toLowerCase() && "bg-sky-600 text-white"}
            ${country?.name?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);
                setOpen(false);
                setInputValue("");
              }
            }}>
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
