import Image from "next/image";
import ChatBoxUserCard from "../shared/Cards/ChatBoxUserCard";
import ChatBoxAdminCard from "../shared/Cards/ChatBoxAdminCard";

const FollowUpCasesChatBox = ({ data }: { data: any }) => {
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
        <ChatBoxUserCard />
        <ChatBoxAdminCard />
      </div>
    </div>
  );
};

export default FollowUpCasesChatBox;
