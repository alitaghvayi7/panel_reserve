import ReplyToUserForm from "@/components/Forms/ReplyToUser";
import PanelPagesLayout from "@/components/panel/PagesLayout";
import ChatBoxAdminCard from "@/components/shared/Cards/ChatBoxAdminCard";
import ChatBoxUserCard from "@/components/shared/Cards/ChatBoxUserCard";
import { nextAuthOptions } from "@/types/Auth";
import { getServerSession } from "next-auth";

const PanelSingleTicket = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const session = await getServerSession(nextAuthOptions);
  const req = await fetch(`${process.env.WebUrl}/api/tickets/track/admin`, {
    method: "POST",
    next: { revalidate: 60, tags: ["adminGetSingleTicket", "tickets"] },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
    body: JSON.stringify({
      id: +params.id,
    }),
  });
  const res = await req.json();
  return (
    <PanelPagesLayout navbar="تمام پیغام های کاربر در این بخش قابل مشاهده است و میتوانید به آن پاسخ دهید.">
      <div className={`border-t border-t-secondary-gray relative lg:px-6`}>
        {/* chat box  */}
        <div
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgb(0 0 0 / 0%) 40%, rgba(189 ,239 ,224 ,1) 20%)",
            backgroundPosition: "right",
            backgroundSize: "1px 20px",
            backgroundRepeat: "repeat-y",
          }}
          className="flex flex-col items-stretch gap-6 min-h-[200px] mt-12 lg:mr-[15%]"
        >
          {/* card */}
          {/* <ChatBoxUserCard />
        <ChatBoxAdminCard /> */}
          {res.Data.TicketDetails.map((item: any, index: number) => {
            if (res.Data.Status === 1 || res.Data.Status === 0) {
              return index % 2 === 0 ? (
                <ChatBoxUserCard
                  ticketTitle={res.Data.Title}
                  messageData={item}
                  ticketID={res.Data.Id}
                  key={item.Id}
                />
              ) : (
                <ChatBoxAdminCard
                  key={item.Id}
                  ticketTitle={res.Data.Title}
                  repliable={false}
                  messageData={item}
                  ticketID={res.Data.Id}
                />
              );
            } else if (res.Data.Status === 3) {
              return index % 2 === 0 ? (
                <ChatBoxAdminCard
                  key={item.Id}
                  ticketTitle={res.Data.Title}
                  repliable={false}
                  messageData={item}
                  ticketID={res.Data.Id}
                />
              ) : (
                <ChatBoxUserCard
                  ticketTitle={res.Data.Title}
                  messageData={item}
                  ticketID={res.Data.Id}
                  key={item.Id}
                />
              );
            }
          })}
        </div>
      </div>
      <div>
        {res.Data.Status === 1 || res.Data.Status === 0 ? (
          <ReplyToUserForm ticketId={+params.id} />
        ) : (
          <div className="text-center p-6">لطفاً منتظر پاسخ کاربر بمانید</div>
        )}
      </div>
    </PanelPagesLayout>
  );
};

export default PanelSingleTicket;
