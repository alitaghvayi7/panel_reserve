import {
  COMMENT_ICON,
  PERSON_WITH_MARK_ICON,
  TAX_ICON,
  VOTE_ICON,
} from "@/components/assets/SVG/Icons";
import { TNavSections } from "@/types";

export const NavSections: TNavSections[] = [
  {
    id: 1,
    title: "پیگیری درخواست‌ها و شکایات",
    description: "تا کنون 200 شکایت از طریق سایت ثبت شده است",
    link: "/requests",
    icon: <PERSON_WITH_MARK_ICON />,
  },
  {
    id: 2,
    title: "پیشنهادات و انتقادات",
    description: "منتظر نظرات و انتقادات شما هستیم",
    link: "/suggestions",
    icon: <COMMENT_ICON />,
  },
  {
    id: 3,
    title: "شفافیت آرا",
    description: "آرای ثبت شده رو اینجا ببین",
    link: "/votes-clarity",
    icon: <VOTE_ICON />,
  },
  {
    id: 4,
    title: "شفافیت اموال",
    description: "هیچ چیزی از شما پنهان نیست!",
    link: "/amval",
    icon: <TAX_ICON />,
  },
];
