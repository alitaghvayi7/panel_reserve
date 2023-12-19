"use client";

import { useEffect, useState } from "react";

const Timer = ({ type }: { type: "asc" | "des" }) => {
  const [duration, setDuration] = useState(0);
  const time = {
    hours: Math.floor(duration / 3600),
    minutes: Math.floor((duration % 3600) / 60),
    seconds: duration % 60,
  };
  useEffect(() => {
    const int = setInterval(() => {
      setDuration((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(int);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* hours */}
      <span>{time.hours < 10 ? `0${time.hours}` : time.hours}</span>
      <span>:</span>
      {/* minutes */}
      <span>{time.minutes < 10 ? `0${time.minutes}` : time.minutes}</span>
      <span>:</span>
      {/* seconds */}
      <span>{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
    </div>
  );
};

export default Timer;
