import { NextRequest, NextResponse } from "next/server";

export const POST = async (data: NextRequest) => {
  console.log(await data.formData());
  return NextResponse.json(
    { data: "hello" },
    {
      status: 200,
    }
  );
};
