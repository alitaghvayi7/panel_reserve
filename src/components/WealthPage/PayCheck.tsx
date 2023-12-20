import { months } from "@/lib/getLastMonths";

const PayCheck = ({ month }: { month: number }) => {
  return (
    <div className={`border-t border-t-secondary-gray relative lg:px-6`}>
      {/* title */}
      <div
        className={`flex items-center justify-center gap-2 whitespace-nowrap absolute -top-[10px] lg:-top-[15px] left-1/2 -translate-x-1/2 bg-white px-8 text-[14px] lg:text-[18px] font-light text-primary-black`}
      >
        آخرین فیش حقوقی {months[month - 1].name} ماه
      </div>
    </div>
  );
};

export default PayCheck;
