"use client";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

export function CustomDatePicker({
  className,
  inputOnchange,
  inputValue,
}: {
  className?: string;
  inputOnchange: (date: string) => void;
  inputValue: string;
}) {
  const [date, setDate] = useState("");
  return (
    <DatePicker
      calendar={{ ...persian }}
      showOtherDays
      locale={{
        ...persian_fa,
      }}
      value={date}
      placeholder="تاریخ"
      className=""
      containerClassName=""
      inputClass="h-auto border py-2 px-4 rounded-lg"
      onChange={(date, options) => {
        if (typeof date?.valueOf() === "number") {
          setDate(date?.toString());
          inputOnchange(
            new Date(Number(date?.valueOf()))
              .toLocaleDateString("en-CA")
              .replaceAll("-", "/")
          );
        }
        // date && inputOnchange(date?.toString());
      }}
      maxDate={new Date()}
    />
  );
}
