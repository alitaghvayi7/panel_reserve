"use client";

import FollowUpCasesUserReplyForm from "@/components/Forms/FollowUpCaseUserReplyForm";
import { useState } from "react";

const SendReplyButton = ({ ticketId }: { ticketId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return isOpen ? (
    <div className="border-t w-full">
      <FollowUpCasesUserReplyForm ticketId={ticketId} />
    </div>
  ) : (
    <button
      onClick={() => {
        setIsOpen(true);
      }}
      className="bg-third-green px-2 py-4 rounded-sm text-[8px] text-primary-black mr-auto"
    >
      ارسال پاسخ
    </button>
  );
};

export default SendReplyButton;
