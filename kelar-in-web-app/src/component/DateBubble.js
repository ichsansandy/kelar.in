import React from "react";

function DateBubble({ date, title }) {
  return (
    <div className="relative">
      <div className="absolute p-1 inset-x-0  -top-6 rounded bg-secondary-color text-fourth-color font-extrabold">{title}</div>
      <div className="bg-third-color p-4 rounded text text-secondary-color font-extrabold" >
        {date}
      </div>
    </div>
  );
}

export default DateBubble;
