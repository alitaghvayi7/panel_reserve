"use client";
import { suggestionsType } from "@/data/SuggestionsType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const SuggestionsPageMainSelectBox = () => {
  const router = useRouter();
  const params = useSearchParams();
  const defaultValue = params?.get("form");
  return (
    <Select
      defaultValue={defaultValue || ""}
      onValueChange={(value) => {
        router.push(`/tickets?form=${value}`);
      }}
    >
      <SelectTrigger className="w-full lg:min-w-[320px] text-[12px] lg:text-[14px] font-light rounded-lg text-third-black">
        <SelectValue placeholder="انتخاب" />
      </SelectTrigger>
      <SelectContent>
        {suggestionsType.map((item) => {
          return (
            <SelectItem
              className="py-2"
              key={item.id}
              value={item.link.toLocaleLowerCase()}
            >
              {item.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SuggestionsPageMainSelectBox;
