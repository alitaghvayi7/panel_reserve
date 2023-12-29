"use client";
import { DANGER_ICON, PEN_ICON } from "@/components/assets/SVG/Icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";

const RemoveAdminDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="h-full cursor-pointer" asChild>
          <div className="flex items-center justify-center p-2 bg-[rgba(234,232,247,1)] rounded-[2px]">
            <PEN_ICON
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
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="w-[30px] h-[30px]">
                <DANGER_ICON />
              </div>
              <p>
                آیا می‌خواهید که کاربر علیرضا حسینی از موقعیت ادمین حذف شود؟
              </p>
              <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full">
                <DialogClose className="border border-[rgba(196,189,239,1)] px-4 py-3 rounded-md">
                  بازگشت
                </DialogClose>
                <button className="text-[rgba(57,40,167,1)] bg-[rgba(196,189,239,1)] px-4 py-3 rounded-md">
                  اعمال
                </button>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default RemoveAdminDialog;
