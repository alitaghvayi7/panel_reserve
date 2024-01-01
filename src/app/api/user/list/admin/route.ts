import { baseUrl } from "@/services/main";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  const remoteReq = await fetch(`${baseUrl}/api/user/getlist`, {
    method: "POST",

    headers: {
      Authorization: req.headers.get("Authorization") || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...reqBody,
    }),
  });
  if (remoteReq.ok) {
    const remoteRes = await remoteReq.json();
    return NextResponse.json(
      {
        ...remoteRes,
      },
      {
        status: remoteReq.status,
        statusText: "Success",
      }
    );
  } else {
    switch (remoteReq.status) {
      case 429: {
        return NextResponse.json(
          {
            message: "تعداد درخواست بیش از حد مجاز",
          },
          {
            status: 429,
          }
        );
      }
      case 400: {
        const res = await remoteReq.json();
        return NextResponse.json(
          {
            message: res.Message,
          },
          {
            status: 400,
          }
        );
      }
      case 500: {
        return NextResponse.json(
          {
            message: "لطفاً فیلترشکن خود را خاموش کنید.",
          },
          {
            status: 500,
          }
        );
      }
      case 401: {
        return NextResponse.json(
          {
            message: "نا معتبر",
          },
          {
            status: 401,
          }
        );
      }

      default: {
        return NextResponse.json(
          {
            message: "خطایی رخ داده است",
          },
          {
            status: 520,
          }
        );
      }
    }
  }
};
