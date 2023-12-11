import Link from "next/link";
import { ARROW_ICON } from "../../assets/SVG/Icons";

const WebSiteNavigationCard = ({
  description,
  icon,
  name,
  link,
}: {
  icon: JSX.Element;
  name: string;
  description: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="w-full max-w-[270px] lg:max-w-[278px] h-full relative flex items-center justify-center mx-auto bg-[#E7EEF4] rounded-2xl rounded-tl-none after:content-[''] after:absolute after:w-[30%] after:min-w-[60px] after:lg:w-[55%] after:h-[3px] after:left-0 lg:after:top-[-1px] after:bg-[#E7EEF4]"
    >
      <div className="absolute w-[30%] min-w-[60px] lg:w-[55%] h-[15px] rounded-tl-2xl rounded-tr-lg bg-[#E7EEF4] bottom-full left-0 after:content-[''] after:absolute after:w-[10px] after:h-[10px] after:rounded-full after:bg-white after:left-[100%] after:bottom-0 after:z-20 before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:bg-[#E7EEF4] before:right-[-3px] before:rotate-[45deg] before:bottom-[-5px] before:z-10"></div>
      <div className="w-full h-full flex flex-col items-center justify-center px-5 lg:px-4 text-center relative">
        <div className="absolute left-[15px] top-[0px] w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]">
          <ARROW_ICON />
        </div>
        <div className="flex items-center justify-center w-[26px] h-[26px] lg:w-[39px] lg:h-[39px]">
          {icon}
        </div>
        <div className="w-full h-[1px] bg-white my-4"></div>
        <div className="text-[12px] xl:text-[16px] text-primary-black font-semibold leading-none whitespace-nowrap">
          {name}
        </div>
        <div className="text-[8px] xl:text-[12px] text-secendory-black leading-none mt-2">
          {description}
        </div>
      </div>
    </Link>
  );
};

export default WebSiteNavigationCard;
