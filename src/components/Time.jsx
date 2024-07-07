import React, { useEffect, useState } from "react";

const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <div className="text-center text-2xl font-bold bg-[#e7ebf1] rounded-lg  mb-2">
      <span>{time}</span>
    </div>
  );
};

export default Time;
