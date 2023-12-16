"use client";

import FormButton from "../shared/Buttons/FormButton";

const VotesClarityPageSearchForm = () => {
  return (
    <form className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
      {/* inputs */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4">
        <div className="rounded-lg border border-secondary-gray px-6 py-3">
          <input
            className="w-full outline-none"
            placeholder="موضوع"
            type="text"
          />
        </div>
        <div className="rounded-lg border border-secondary-gray px-6 py-3">
          <input
            className="w-full outline-none"
            placeholder="موضوع"
            type="date"
          />
        </div>
      </div>
      {/* submit */}
      <div className="">
        <FormButton type="submit">جستجو</FormButton>
      </div>
    </form>
  );
};

export default VotesClarityPageSearchForm;
