import Image from "next/image";
import SendReplyButton from "../Buttons/SendReplyButton";
import { convertToPersianNumber, parseDateTime } from "@/lib/utils";

const ChatBoxAdminCard = ({
  repliable,
  messageData,
  ticketID,
  ticketTitle,
  role = "User",
}: {
  repliable: boolean;
  ticketID: number;
  messageData: any;
  ticketTitle: string;
  role?: "Admin" | "User";
}) => {
  const { dateString, timeString } = parseDateTime(messageData.CreatedAt);
  return (
    <div className="relative">
      <div className="flex items-center gap-4 relative">
        <div className="absolute -right-[6px] top-0 w-[14px] h-[14px] bg-card-green rounded-full border-2 border-third-black flex items-center justify-center">
          <div className="w-[8px] h-[8px] bg-green-700 rounded-full"></div>
        </div>
        <div className="absolute right-[20px] lg:right-[-130px] -top-[2px] flex items-center gap-2 text-[14px] font-medium text-secondary-black">
          <span>{timeString}</span>
          <span className="w-[2px] h-[15px] bg-secondary-black mb-1"></span>
          <span>{dateString}</span>
        </div>
      </div>
      <div className="relative text-white leading-none mr-2 lg:mr-6">
        {/* triangle */}
        <div className="absolute w-[40px] h-[10px] border-t border-r rounded-tr-[14px] rounded-br-[22px] right-[5px] top-[0px] z-[10] bg-card-green after:content-[''] after:border-b after:z-[2] after:absolute after:w-[37px] after:h-[9px] after:bg-card-green after:top-[12px] after:right-[-2px] after:-rotate-45 before:content-[''] before:absolute before:w-[20px] before:h-[15px] before:rotate-[-45deg] before:top-[7px] before:right-[15px] before:bg-card-green"></div>
        {/* content */}
        <div className="flex flex-col items-stretch max-w-[840px] gap-4 rounded-md rounded-tr-none p-4 bg-card-green mt-8 lg:mt-0 mr-8 border">
          <div className="flex items-center gap-2">
            <div className="relative w-[24px] h-[24px] rounded-full overflow-hidden">
              <Image src={`/Images/person.png`} alt="" fill />
            </div>
            <div className="text-[10px] lg:text-[14px] font-light text-secondary-black">
              {role === "User"
                ? "پاسخ دکتر پزشکیان نماینده مجلس"
                : "پاسخ ادمین"}
            </div>
          </div>
          <div className="text-[14px] lg:text-[20px] text-primary-black font-medium">
            موضوع: {ticketTitle}
          </div>
          <p className="text-[12px] lg:text-[16px] text-secondary-black leading-6">
            {messageData.Description}
          </p>
          {/* reply button */}
          {repliable ? (
            <div className="w-full flex">
              <SendReplyButton ticketId={ticketID} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatBoxAdminCard;
