import React, { useEffect, useState } from "react";
import moment from "moment";

function DueDateBadge({dueDate}) {
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    var date = moment.duration(moment()-moment(dueDate), "milliseconds").asDays() 
    if(date < 0){
        setToDate(` Late ${Math.abs(Math.round(date))} Day`)
    }else if(date < 1){
        setToDate(` D-DAY`)
    }else {
        setToDate(` D-${Math.abs(Math.round(date))} `)
    }
  }, []);

  return (
    <div className="rounded w-fit h-7 py-1 px-2 text-sm font-bold bg-third-color text-white">
      <svg className="h-4 w-4  inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        {" "}
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /> <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
      <div className="inline">{
    //   moment.duration(moment()-moment(dueDate), "milliseconds").asDays() 
        // moment().to(dueDate)
        toDate
      }</div>
    </div>
  );
}

export default DueDateBadge;
