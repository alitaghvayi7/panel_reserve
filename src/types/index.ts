export type TNavSections = {
  id: number;
  title: string;
  link: string;
  description: string;
  icon: JSX.Element;
  miniIcon?: JSX.Element;
};

export type TSearchParams = {
  [key: string]: string;
};

export type TFilterTicketDate = "today" | "lastWeek" | "lastMonth";
