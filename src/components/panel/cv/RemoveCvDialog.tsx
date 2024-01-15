"use client";
import {
  DANGER_ICON,
  DELETE_ICON,
  PEN_ICON,
} from "@/components/assets/SVG/Icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
type TProps = {
  id: number;
  title: string;
  post: string;
  duration: string;
};
const RemoveCvDialog = ({ duration, id, post, title }: TProps) => {
  const router = useRouter();
  const session = useSession();
  const closeButtonRef = useRef<null | HTMLButtonElement>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const req = await fetch(`/api/cv/deleteCv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.data?.user.token}`,
      },
      body: JSON.stringify({ Id: id }),
    });
    if (req.ok) {
      router.refresh();
      closeButtonRef.current?.click();
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="h-full cursor-pointer" asChild>
          <div className="flex items-center justify-center p-2 bg-[rgba(234,232,247,1)] rounded-[2px]">
            <DELETE_ICON
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-[45] bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogContent className="max-w-[308px] sm:max-w-[390px] rounded-2xl lg:max-w-[484px] px-4 lg:px-12">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-6"
            >
              <div className="w-[30px] h-[30px]">
                <DANGER_ICON />
              </div>
              <p>آیا اطمینان دارید که رزومه {title} حذف شود؟</p>
              <div className="flex flex-col items-stretch gap-4">
                <div className="flex gap-2">
                  <span>عنوان شغلی:</span>
                  <span>{post}</span>
                </div>
                <div className="flex gap-2">
                  <span>مدت کار:</span>
                  <span>{duration}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full">
                <DialogClose
                  ref={closeButtonRef}
                  className="border border-[rgba(196,189,239,1)] px-4 py-3 rounded-md"
                >
                  بازگشت
                </DialogClose>
                <button
                  type="submit"
                  className="text-[rgba(57,40,167,1)] bg-[rgba(196,189,239,1)] px-4 py-3 rounded-md"
                >
                  حذف
                </button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default RemoveCvDialog;
