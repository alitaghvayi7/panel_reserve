const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <div className="w-[8px] min-w-[8px] h-[8px] min-h-[8px] lg:w-[13px] lg:h-[13px] rounded-[2px] lg:rounded-sm bg-secondary-blue"></div>
      <h1 className="text-[14px] lg:text-[20px] leading-none font-bold text-primary-black">
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;
