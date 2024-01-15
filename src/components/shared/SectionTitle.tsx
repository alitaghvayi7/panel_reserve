const SectionTitle = ({
  title,
  Heading = "h2",
}: {
  title: string;
  Heading?: "h1" | "h2" | "h3" | "h4";
}) => {
  return (
    <div className="flex items-start gap-2 lg:gap-3">
      <div className="w-[8px] min-w-[8px] h-[8px] min-h-[8px] lg:w-[13px] lg:h-[13px] rounded-[2px] lg:rounded-sm bg-secondary-blue mt-[2px]"></div>
      <Heading className="text-[14px] lg:text-[20px] leading-none font-bold text-primary-black">
        {title}
      </Heading>
    </div>
  );
};

export default SectionTitle;
