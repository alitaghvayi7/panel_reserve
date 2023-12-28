import ChatBoxUserCard from "../shared/Cards/ChatBoxUserCard";
import ChatBoxAdminCard from "../shared/Cards/ChatBoxAdminCard";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/types/Auth";

const FollowUpCasesChatBox = async ({ data }: { data: any }) => {
  const session = await getServerSession(nextAuthOptions);
  const req = await fetch(`${process.env.WebUrl}/api/tickets/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
    body: JSON.stringify({
      code: data.code,
    }),
  });
  const res = await req.json();
  if (req.status === 400) {
    return (
      <div className="text-center text-[16px] font-bold lg:text-[20px]">
        {res.message}
      </div>
    );
  }
  return (
    <div className={`border-t border-t-secondary-gray relative lg:px-6`}>
      {/* code box */}
      <div
        className={`flex items-center justify-center gap-2 whitespace-nowrap absolute -top-[10px] left-1/2 -translate-x-1/2 bg-white px-6 text-[14px] font-medium text-primary-black`}
      >
        <span>کد پیگیری:</span>
        <span>
          {data.code.toLocaleString("fa-IR", {
            useGrouping: false,
          })}
        </span>
      </div>
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
                repliable={index === 0 ? true : false}
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
  );
};

export default FollowUpCasesChatBox;
