import { baseUrl } from "@/services/main";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  const remoteReq = await fetch(`${baseUrl}/api/news/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  const data = await remoteReq.json();
  if (remoteReq.ok)
    return NextResponse.json(data, { status: 200, statusText: "Success" });
  else {
    return NextResponse.json(data, {
      status: remoteReq.status,
      statusText: "Error",
    });
  }
};
