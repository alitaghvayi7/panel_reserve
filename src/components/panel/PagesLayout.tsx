import { getPersianDate } from "@/lib/utils";
export const dynamic = "force-dynamic";

const PanelPagesLayout = ({
  navbar,
  children,
}: {
  navbar: string | JSX.Element;
  children?: React.ReactNode;
}) => {
  const date = getPersianDate();
  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-third-green py-4 flex items-center justify-between relative">
        <div>
          {typeof navbar === "string" ? (
            <span className="text-[12px] font-medium text-secondary-black">
              {navbar}
            </span>
          ) : (
            navbar
          )}
        </div>
        <div className="flex items-center gap-2 text-[12px] font-medium text-third-black leading-none">
          <span>تاریخ امروز</span>
          <span>{date}</span>
        </div>
      </header>
      <div className="flex flex-col items-stretch gap-4">{children}</div>
    </div>
  );
};

export default PanelPagesLayout;
