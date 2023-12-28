import { baseUrl } from "@/services/main";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const remoteReq = await fetch(`${baseUrl}/api/ticketcategory/getall`, {
    method: "POST",
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
    const res = await remoteReq.json();

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
