"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { CHEVRON_RIGHT } from "../assets/SVG/Icons";
import { ShekayatSubjects } from "@/data/ShekayatSubjects";

export const SelectSubject = ({
  title,
  setTitle,
}: {
  title: {
    id: number;
    title: string;
    subTitle: string;
  };
  setTitle: Dispatch<
    SetStateAction<{
      id: number;
      title: string;
      subTitle: string;
    }>
  >;
}) => {
  const [isSelectSubjectOpen, setIsSelectSubjectOpen] = useState(false);

  return (
    <>
      <label
        className="text-[14px] lg:text-[18px] font-light text-primary-black"
        htmlFor="title"
      >
        موضوع شکایت خود را انتخاب کنید:
      </label>
      <div
        onClick={() => setIsSelectSubjectOpen(!isSelectSubjectOpen)}
        className="mt-2 relative select-none custom-scroll-bar min-w-[250px]"
      >
        <div className="flex items-center justify-between border rounded-lg px-4 py-3 leading-none text-[12px] text-secondary-black cursor-pointer">
          <span>
            {title.title} {title.subTitle ? `- ${title.subTitle}` : null}
          </span>
          <span className="w-[16px] h-[16px] -rotate-90">
            <CHEVRON_RIGHT />
          </span>
        </div>
        <div
          className={`absolute z-[20] top-[50px] left-0 w-full bg-white border rounded-lg duration-150 ${
            isSelectSubjectOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-[0px] opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col py-2 items-stretch gap-4">
            {ShekayatSubjects.map((item) => {
              if (item.children) {
                return (
                  <SubSelectSubject
                    key={item.id}
                    data={item.children}
                    setValue={setTitle}
                    title={item.name}
                    setIsMenuOpen={setIsSelectSubjectOpen}
                  />
                );
              } else {
                return (
                  <div
                    onClick={() => {
                      setTitle({
                        id: item.id,
                        title: item.name,
                        subTitle: "",
                      });
                    }}
                    key={item.id}
                    className="text-[14px] font-light text-secendory-black px-6 py-2 mx-2 lg:px-4 cursor-pointer hover:bg-secondary-black/40 rounded-lg"
                  >
                    {item.name}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-red-500"></p>
    </>
  );
};

export const SubSelectSubject = ({
  data,
  setValue,
  title,
  setIsMenuOpen,
}: {
  title: string;
  data: any[];
  setValue: any;
  setIsMenuOpen: any;
}) => {
  const [isSubSelectSubjectOpen, setIsSubSelectSubjectOpen] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsSubSelectSubjectOpen(!isSubSelectSubjectOpen);
      }}
      className={`flex flex-col items-stretch leading-none relative`}
    >
      <div className="flex items-center justify-between cursor-pointer select-none">
        <span className="text-[14px] font-light text-secendory-black px-6 py-2 mx-2 lg:px-4 cursor-pointer">
          {title}
        </span>
        <span className="w-[16px] h-[15px] -rotate-90 lg:rotate-0">
          <CHEVRON_RIGHT
            style={{
              width: "16px",
              height: "16px",
            }}
          />
        </span>
      </div>
      <div className="">
        <div
          className={`w-full lg:w-fit whitespace-nowrap overflow-hidden lg:absolute lg:right-[102%] lg:-top-[80px] overflow-y-auto transition-[opacity] duration-150 custom-scroll-bar ${
            isSubSelectSubjectOpen
              ? "max-h- opacity-100 mt-4"
              : "max-h-[0px] opacity-0"
          }`}
        >
          {/* <div className="absolute w-[100px] h-[100px] bg-black right-full z-[50]"></div> */}
          <div className="flex flex-col items-stretch py-2 lg:py-4 lg:border lg:rounded-lg bg-white">
            {data.map((item) => {
              return (
                <div
                  onClick={() => {
                    setValue({
                      id: item.id,
                      title: title,
                      subTitle: item.name,
                    });
                    setIsMenuOpen(false);
                  }}
                  key={item.id}
                  className="text-[14px] font-light text-secendory-black px-6 py-2 mx-2 lg:px-4 cursor-pointer hover:bg-secondary-black/40 rounded-lg"
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
