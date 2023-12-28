import {
  MAIL_WITH_PERSON_ICON,
  MULTIPLE_PERSON_ICON,
  WRITE_MESSAGE_ICON,
} from "@/components/assets/SVG/Icons";

export const PanelSidbarNav = [
  {
    id: 1,
    name: "درخواست‌ها",
    link: "/panel/tickets",
    activeIcon: <MAIL_WITH_PERSON_ICON fill="#114737" />,
    inactiveIcon: <MAIL_WITH_PERSON_ICON />,
  },
  {
    id: 2,
    name: "کاربران",
    link: "/panel/users",
    activeIcon: <MULTIPLE_PERSON_ICON fill="#114737" />,
    inactiveIcon: <MULTIPLE_PERSON_ICON />,
  },
  // {
  //   id: 3,
  //   name: "ارسال پیام",
  //   link: "/panel/send-message",
  //   activeIcon: <WRITE_MESSAGE_ICON fill="#114737" />,
  //   inactiveIcon: <WRITE_MESSAGE_ICON />,
  // },
];
