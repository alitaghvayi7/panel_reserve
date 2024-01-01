import { HOME_ICON } from "@/components/assets/SVG/Icons";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link
      href={`/`}
      className="flex items-center justify-center gap-2 border border-[rgba(57,40,167,1)] lg:border-none bg-white px-2 lg:px-4 py-2 rounded-lg text-white w-[35px] lg:w-auto aspect-square lg:aspect-auto"
    >
      <span className="w-[13px] h-[13px]">
        <HOME_ICON fill="#291C77" />
      </span>
    </Link>
  );
};

export default HomeButton;
