import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProgressBubble({ status }) {
  const [bgColor, setBgColor] = useState(null);
  const selector = useSelector((s) => s.statusColor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: `${status}` });
    switch (status) {
      case "INPROGRESS":
        return setBgColor("bg-yellow-300 text-white");
      case "ASSIGN":
        return setBgColor("bg-blue-300 text-white");
      case "REJECTED":
        return setBgColor("bg-rose-500 text-white");
      case "ONHOLD":
        return setBgColor("bg-slate-600 text-white");
      case "COMPLETED":
        return setBgColor("bg-green-500 text-white");
      default:
        break;
    }
  }, []);

  return (
    <>
      <div className={"px-3 rounded-2xl w-28 " + `${bgColor}`}>{status}</div>
    </>
  );
}

export default ProgressBubble;
