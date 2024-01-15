"use client";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn, convertToLatinNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function RangeDatePicker({
  className,
  field,
}: {
  className?: string;
  field: ControllerRenderProps<FieldValues, "duration">;
}) {
  const [[from, to], setDate] = useState<Date[] | string[]>(["", ""]);
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal gap-2",
              !from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? (
              to ? (
                <>
                  {from}-{to}
                </>
              ) : (
                <>{from}</>
              )
            ) : (
              <span>تاریخ - تاریخ</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={[from as string, to as string]}
            onChange={(date, options) => {
              const dates = date?.toString().split(",");
              if (dates) {
                if (dates[0] && dates[1]) {
                  setDate([dates[0], dates[1]]);
                  field.onChange(`${dates[1]} - ${dates[0]}`);
                }
              }
            }}
            range
            maxDate={new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
