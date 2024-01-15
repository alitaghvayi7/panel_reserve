import { baseUrl } from "@/services/main";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  const remoteReq = await fetch(`${baseUrl}/api/user/login`, {
    method: "POST",
    next: {
      revalidate: 0,
    },
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Mobile: reqBody?.phone,
    }),
  });
  if (remoteReq.ok) {
    const remoteRes = await remoteReq.json();

    return NextResponse.json(
      {
        ...remoteRes,
      },
      {
        status: 200,
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
      case 422: {
        return NextResponse.json(
          {
            message: "موبایل وارد شده صحیح نمی باشد.",
          },
          {
            status: 422,
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
