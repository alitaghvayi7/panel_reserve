import {
  AWARDS_ICON,
  CV_ICON,
  MAIL_WITH_PERSON_ICON,
  MULTIPLE_PERSON_ICON,
  NEWS_ICON,
  PROGRAMS_ICON,
  WEALTH_ICON,
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
  {
    id: 3,
    name: "اخبار",
    link: "/panel/news",
    activeIcon: <NEWS_ICON fill="#114737" />,
    inactiveIcon: <NEWS_ICON />,
  },
  {
    id: 4,
    name: "شفافیت اموال",
    link: "/panel/wealth",
    activeIcon: <WEALTH_ICON fill="#114737" />,
    inactiveIcon: <WEALTH_ICON />,
  },
  {
    id: 5,
    name: "جوایز و افتخارات",
    link: "/panel/awards",
    activeIcon: <AWARDS_ICON fill="#114737" />,
    inactiveIcon: <AWARDS_ICON />,
  },
  {
    id: 6,
    name: "رزومه",
    link: "/panel/cv",
    activeIcon: <CV_ICON fill="#114737" />,
    inactiveIcon: <CV_ICON />,
  },
  {
    id: 7,
    name: "برنامه و ایدئولوژی",
    link: "/panel/programs",
    activeIcon: <PROGRAMS_ICON fill="#114737" />,
    inactiveIcon: <PROGRAMS_ICON />,
  },
  // {
  //   id: 3,
  //   name: "ارسال پیام",
  //   link: "/panel/send-message",
  //   activeIcon: <WRITE_MESSAGE_ICON fill="#114737" />,
  //   inactiveIcon: <WRITE_MESSAGE_ICON />,
  // },
];
