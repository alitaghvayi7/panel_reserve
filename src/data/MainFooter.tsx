import {
  LOCATION_ICON,
  MAIL_ICON,
  PHONE_ICON,
} from "@/components/assets/SVG/Icons";

export const MainFooterNavigation = [
  {
    id: 1,
    name: "صفحه اصلی",
    link: "/",
  },
  {
    id: 2,
    name: "درباره ما",
    link: "/about-us",
  },
  {
    id: 3,
    name: "قوانین و مقررات",
    link: "/terms",
  },
];

export const MainFooterAboutUs = [
  {
    id: 1,
    icon: <LOCATION_ICON />,
    description:
      "آدرس دفتر: تهران، خیابان ولیعصر، منطقه ۱۷ بلوار جنت آباد، کوچه ۱۵، پلاک ۳۰",
  },
  {
    id: 2,
    icon: <MAIL_ICON />,
    description: "dr.mokfdlksfjl@gmail.com",
  },
  {
    id: 3,
    icon: <PHONE_ICON />,
    description: "09125488588",
  },
];
