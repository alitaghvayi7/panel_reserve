import { baseUrl } from "@/services/main";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.formData();
  //   console.log(reqBody);
  //   console.log(reqBody.get("TicketAttachment"));
  const remoteReq = await fetch(`${baseUrl}/api/ticket/add`, {
    method: "POST",
    next: {
      revalidate: 0,
    },
    headers: {
      Authorization: req.headers.get("Authorization") || "",
    },
    body: reqBody,
  });
  //   return NextResponse.json({ message: "test" });
  if (remoteReq.ok) {
    const remoteRes = await remoteReq.json();

    return NextResponse.json(
      {
        ...remoteRes,
        // message: "test",
      },
      {
        status: remoteReq.status,
        statusText: "Success",
      }
    );
  } else {
    console.log(remoteReq.status);

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
