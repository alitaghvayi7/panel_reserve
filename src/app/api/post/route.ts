import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  return NextResponse.json(
    {
      message: "hello",
    },
    {
      status: 200,
    }
  );
};
