"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const testFetch = async () => {
      const res = await fetch("/api/post");
      const data = await res.json();
      console.log(data);
    };

    testFetch();
  }, []);

  return <main className=""></main>;
}
