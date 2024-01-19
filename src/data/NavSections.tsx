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
    link: "/follow-up-cases",
    icon: <PERSON_WITH_MARK_ICON />,
    miniIcon: <PERSON_WITH_MARK_ICON fill="#7D7D7D" />,
  },
  {
    id: 2,
    title: "پیشنهادات و انتقادات",
    description: "منتظر نظرات و انتقادات شما هستیم",
    link: "/tickets",
    icon: <COMMENT_ICON />,
    miniIcon: <COMMENT_ICON fill="#7D7D7D" />,
  },
  {
    id: 3,
    title: "شفافیت آرا",
    description: "آرای ثبت شده رو اینجا ببین",
    link: "/votes-clarity",
    icon: <VOTE_ICON />,
    miniIcon: <VOTE_ICON fill="#7D7D7D" />,
  },
  // {
  //   id: 4,
  //   title: "شفافیت اموال",
  //   description: "هیچ چیزی از شما پنهان نیست!",
  //   link: "/wealth",
  //   icon: <TAX_ICON />,
  // },
];

export const CandidateInfoNav = [
  {
    id: 1,
    title: "جوایز و افتخارات ",
    link: "/candidate-info/awards",
    image: "/Images/awards.png",
    description: "چه جایزه هایی استاد گرفته؟!",
  },
  {
    id: 2,
    title: "رزومه",
    link: "/candidate-info/cv",
    image: "/Images/rezume.png",
    description: "رزومه استاد پزشکیان رو ببین!",
  },
  {
    id: 3,
    title: "برنامه و ایدئولوژی",
    link: "/candidate-info/programs",
    image: "/Images/programs.png",
    description: "برنامه های اینده رو ببین",
  },
];
