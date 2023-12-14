import { HOME_ICON } from "@/components/assets/SVG/Icons";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link
      href={`/`}
      className="flex items-center justify-center gap-2 bg-primary-blue lg:bg-white px-4 py-2 rounded-lg text-white"
    >
      <span className="w-[14px] h-[14px] lg:hidden">
        <HOME_ICON fill="white" />
      </span>
      <span className="hidden lg:block lg:w-[12px] lg:h-[12px]">
        <HOME_ICON fill="#291C77" />
      </span>
      <span className="text-[10px] font-medium lg:hidden">خانه</span>
    </Link>
  );
};

export default HomeButton;
