export const months = [
  {
    id: 1,
    name: "فروردین",
  },
  {
    id: 2,
    name: "اردیبهشت",
  },
  {
    id: 3,
    name: "خرداد",
  },
  {
    id: 4,
    name: "تیر",
  },
  {
    id: 5,
    name: "مرداد",
  },
  {
    id: 6,
    name: "شهریور",
  },
  {
    id: 7,
    name: "مهر",
  },
  {
    id: 8,
    name: "آبان",
  },
  {
    id: 9,
    name: "آذر",
  },
  {
    id: 10,
    name: "دی",
  },
  {
    id: 11,
    name: "بهمن",
  },
  {
    id: 12,
    name: "اسفند",
  },
];
const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const getLastMonths = () => {
  let date = new Date();
  let currentMonth = date.toLocaleDateString("fa-IR", { month: "numeric" });

  for (let i = 0; i < 10; i++) {
    let regex = new RegExp(persianNumbers[i], "g");
    currentMonth = currentMonth.replace(regex, englishNumbers[i]);
  }

  return months.slice(0, +currentMonth - 1);
};
