const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <div className="w-[8px] h-[8px] lg:w-[13px] lg:h-[13px] rounded-sm bg-secendory-blue"></div>
      <h3 className="text-[20px] lg:text-[24px] leading-none font-bold text-primary-black">
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
