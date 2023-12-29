import { parseDateTime } from "@/lib/utils";
import Image from "next/image";

const ChatBoxUserCard = ({
  messageData,
  ticketID,
  ticketTitle,
}: {
  ticketID: number;
  messageData: any;
  ticketTitle: string;
}) => {
  const { dateString, timeString } = parseDateTime(messageData.CreatedAt);
  return (
    <div className="relative">
      <div className="flex items-center gap-4 relative">
        <div className="absolute -right-[6px] top-0 w-[14px] h-[14px] bg-white rounded-full border-2 border-third-black flex items-center justify-center">
          <div className="w-[8px] h-[8px] bg-green-700 rounded-full"></div>
        </div>
        <div className="absolute right-[20px] lg:right-[-150px] -top-[2px] flex items-center gap-2 text-[14px] font-medium text-secondary-black">
          <span>{timeString}</span>
          <span className="w-[2px] h-[15px] bg-secondary-black mb-1"></span>
          <span>{dateString}</span>
        </div>
      </div>
      <div className="relative text-white leading-none mr-2 lg:mr-6">
        {/* triangle */}
        <div className="absolute w-[40px] h-[10px] border-t border-r rounded-tr-[14px] rounded-br-[22px] right-[5px] top-[0px] z-[10] bg-white after:content-[''] after:border-b after:z-[2] after:absolute after:w-[37px] after:h-[9px] after:bg-white after:top-[12px] after:right-[-2px] after:-rotate-45 before:content-[''] before:absolute before:w-[20px] before:h-[15px] before:rotate-[-45deg] before:top-[7px] before:right-[15px] before:bg-white"></div>
        {/* content */}
        <div className="flex flex-col items-stretch max-w-[840px] gap-4 rounded-md rounded-tr-none p-4 bg-white mt-8 lg:mt-0 mr-8 border">
          <div className="flex items-center gap-2">
            <div className="w-[2px] h-[2px] bg-primary-black rounded-full overflow-hidden"></div>
            <div className="text-[10px] lg:text-[14px] font-light text-secondary-black">
              شما ارسال کردید
            </div>
          </div>
          <div className="text-[14px] lg:text-[20px] text-primary-black font-medium">
            موضوع: {ticketTitle}
          </div>
          <p className="text-[12px] lg:text-[16px] text-secondary-black leading-6">
            {messageData.Description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxUserCard;
