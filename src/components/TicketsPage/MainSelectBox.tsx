"use client";
import { suggestionsType } from "@/data/SuggestionsType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const SuggestionsPageMainSelectBox = ({ categories }: { categories: any }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <Select
      onValueChange={(value) => {
        const [id, title] = value.split("/");
        router.push(`/tickets/${id}`);
        return title;
      }}
    >
      <SelectTrigger className="w-full lg:min-w-[320px] text-[12px] lg:text-[14px] font-light rounded-lg text-third-black">
        <SelectValue placeholder="انتخاب" />
      </SelectTrigger>
      <SelectContent>
        {categories.Data.map((item: { Id: number; Title: string }) => {
          return (
            <SelectItem
              className="py-2"
              key={item.Id}
              value={`${item.Id}/${item.Title}`}
            >
              {item.Title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SuggestionsPageMainSelectBox;
