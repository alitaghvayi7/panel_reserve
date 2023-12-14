"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "@/styles/swiper-styles.css";
import { Pagination } from "swiper/modules";

import Image from "next/image";
import { AZADI_LOGO, IRAN_LOGO } from "../assets/SVG/Logos";

import AuthDialog from "../shared/AuthDialog";
const HomePageCarousel = () => {
  return (
    <div className="">
      <div className="h-[414px] lg:h-[512px] rounded-2xl overflow-hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{
            enabled: true,
            // dynamicBullets: true,
            // dynamicMainBullets: 3,
          }}
          className="w-full h-full overflow-y-visible"
          style={{
            background: "linear-gradient(269deg, #187055 4.45%, #62D4A4 100%)",
            // @ts-ignore
            "--swiper-pagination-bullet-border-radius": "50%",
            "--swiper-pagination-bullet-active-border": "solid 1px #BDBDBD",
            "--swiper-pagination-bullet-width": "12px",
            "--swiper-pagination-bullet-height": "12px",
            "--swiper-pagination-color": "#F6F6F6",
            "--swiper-pagination-bullet-horizontal-gap": "8px",
            "--swiper-pagination-bottom": "-5px",
            "--swiper-pagination-bullet-inactive-color": "#F6F6F6",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-inactive-border": "solid 1px #EEE",
          }}
        >
          <SwiperSlide className="rounded-2xl p-10 relative">
            <div className="flex flex-col sm:flex-row justify-between px-6 absolute right-0 left-0 top-8 z-40">
              <div className="text-[20px] lg:text-[24px] text-white font-black leading-8 lg:leading-[48px] max-w-[400px]">
                مردی از دل مردم انتخابی بر اساس شایسته سالاری
              </div>
              <div className="self-end sm:self-start">
                <AuthDialog />
              </div>
            </div>
            <div className="absolute left-[-10px] lg:left-10 bottom-0 overflow-hidden w-[280px] h-[280px] md:w-[350px] md:h-[340px] lg:w-[500px] lg:h-[500px] z-20">
              <Image src={`/Images/person.png`} alt="" fill />
            </div>
            <div className="hidden xl:block absolute bottom-0 left-0 right-0 max-w-[780px] max-h-[490px] mx-auto z-10">
              <AZADI_LOGO />
            </div>
            <div className="hidden sm:block absolute right-6 top-[100px] lg:top-[150px]">
              <IRAN_LOGO />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomePageCarousel;
