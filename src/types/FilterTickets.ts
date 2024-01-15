import { TFilterTicketDate } from ".";

export type queryNames = {
  FromDate: string | null;
  TicketCategoryId: number | null;
};
export type UserFilterQueryNames = {
  isAdmin: boolean;
};

export type TMenuName = "نوع" | "تاریخ";
export type TMenuItem = {
  id: number;
  name: TMenuName;
  children: TMenuItemChild[];
  queryName: "FromDate" | "TicketCategoryId";
};
export type TUserFilterMenuItem = {
  id: number;
  name: "ادمین";
  children: TMenuItemChild[];
  queryName: "isAdmin";
};
export type TMenuItemChild = {
  Id: TFilterTicketDate | string;
  Title: string;
};
