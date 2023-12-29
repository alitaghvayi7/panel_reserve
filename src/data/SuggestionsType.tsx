import Shekayat from "@/components/TicketsPage/Shekayat";

export const questionTypes = {
  0: "radio",
  1: "checkbox",
  2: "text",
  3: "file",
};

export const suggestionsType = [
  {
    id: 1,
    name: "درد و دل",
    link: "sympathy",
    component: <div>درد و دل</div>,
  },
  {
    id: 2,
    name: "شکایات",
    link: "complaints",
    component: <Shekayat />,
  },
  {
    id: 3,
    name: "انتقادات",
    link: "animadversion",
    component: <div>انتقادات</div>,
  },
  {
    id: 4,
    name: "پیشنهادات",
    link: "suggestion",
    component: <div>پیشنهادات</div>,
  },
  {
    id: 5,
    name: "تقدیر و تشکر",
    link: "appreciation",
    component: <div>تقدیر و تشکر</div>,
  },
  {
    id: 6,
    name: "درخواست",
    link: "request",
    component: <div>درخواست</div>,
  },
  {
    id: 7,
    name: "ارائه مشکل",
    link: "problem",
    component: <div>ارائه مشکل</div>,
  },
  {
    id: 8,
    name: "سایر",
    link: "others",
    component: <div>سایر</div>,
  },
];
