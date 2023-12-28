import { baseUrl } from "@/services/main";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  const formData = new FormData();
  formData.append("Id", reqBody.id);
  formData.append("Description", reqBody.description);

  const remoteReq = await fetch(`${baseUrl}/api/ticket/reply`, {
    method: "POST",

    headers: {
      Authorization: req.headers.get("Authorization") || "",
    },
    body: formData,
  });
  if (remoteReq.ok) {
    const remoteRes = await remoteReq.json();
    revalidateTag("tickets");
    revalidatePath(`/panel/tickets`, "layout");
    revalidatePath(`/follow-up-cases`, "layout");
    revalidatePath(`/panel/tickets/${reqBody.id}`, "layout");
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
    const remoteRes = await remoteReq.json();

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
        return NextResponse.json(
          {
            message: remoteRes.Message,
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
