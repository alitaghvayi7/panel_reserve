import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  revalidateTag("news");
  // const reqBody = await req.formData();
  // const remoteReq = await fetch(`${baseUrl}/api/news/add`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: req.headers.get("Authorization") || "",
  //   },
  //   body: reqBody,
  // });

  // if (remoteReq.ok) {
  //   const remoteRes = await remoteReq.json();
  //   revalidateTag("news");
  //   return NextResponse.json(
  //     {
  //       ...remoteRes,
  //     },
  //     {
  //       status: remoteReq.status,
  //       statusText: "Success",
  //     }
  //   );
  // } else {
  //   switch (remoteReq.status) {
  //     case 429: {
  //       return NextResponse.json(
  //         {
  //           message: "تعداد درخواست بیش از حد مجاز",
  //         },
  //         {
  //           status: 429,
  //         }
  //       );
  //     }
  //     case 500: {
  //       return NextResponse.json(
  //         {
  //           message: "لطفاً فیلترشکن خود را خاموش کنید.",
  //         },
  //         {
  //           status: 500,
  //         }
  //       );
  //     }

  //     default: {
  //       return NextResponse.json(
  //         {
  //           message: "خطایی رخ داده است",
  //         },
  //         {
  //           status: 520,
  //         }
  //       );
  //     }
  //   }
  // }
};
