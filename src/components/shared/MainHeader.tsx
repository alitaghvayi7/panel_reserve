import Image from "next/image";
import Link from "next/link";
import { HOME_ICON } from "../assets/SVG/Icons";
import HomeButton from "./Buttons/HomeButton";
import AuthDialog from "./AuthDialog";
import { NavigationHamburgerMenu } from "./NavigationHamburgerMenu";

const MainHeader = () => {
  return (
    <header
      style={{
        background: "linear-gradient(251deg, #187055 19.17%, #62D4A4 76.13%)",
      }}
      className="relative flex items-center rounded-2xl px-3 py-3 lg:px-10 lg:py-5 mb-6 lg:max-w-[1200px] mx-auto"
    >
      {/* Desktop Flage */}
      <div className="absolute left-[10%] top-0 bottom-0 h-full w-[500px] hidden lg:block overflow-hidden">
        <Image src={`/Images/Iran-flag.png`} alt="Iran Flage" fill />
      </div>
      {/* Mobile Flage  */}
      <div className="absolute left-[0] top-0 bottom-0 h-full w-[200px] rounded-l-2xl lg:hidden overflow-hidden">
        <Image
          className="object-cover"
          src={`/Images/Iran-mobile-flag.png`}
          alt="Iran Flage"
          fill
        />
      </div>
      {/* info */}
      <div className="w-full flex items-center justify-between gap-2 relative">
        {/* profile */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Nav Menu */}
          <div className="flex items-center justify-center">
            <NavigationHamburgerMenu />
          </div>
          {/* profile picture */}
          <div className="absolute right-[35px] lg:right-[55px] w-[66px] lg:w-[92px] min-w-[66px] lg:minw-w-[92px] h-[66px] lg:h-[92px] min-h-[66px] lg:min-h-[92px] rounded-full overflow-hidden border-2 border-white">
            <Image
              className="object-cover"
              src={`/Images/profile.png`}
              alt="profile picture"
              fill
            />
          </div>
          {/* profile name  */}
          <div className="flex flex-col items-start gap-2 leading-none justify-center relative z-[15] text-white mr-[85px] lg:mr-[130px]">
            {/* name */}
            <div className="text-[8px] lg:text-[12px] font-bold leading-none">
              دکتر مسعود پزشکیان
            </div>
            {/* description */}
            <p className="text-[6px] lg:text-[12px] leading-none">
              نماینده مردم شریف تبریز ، آذرشهر و اسکو در مجلس شورای اسلامی
            </p>
          </div>
        </div>
        {/*  buttons */}
        <div className="">
          <AuthDialog />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
