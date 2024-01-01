import AuthDialog from "@/components/shared/AuthDialog";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { parseDateTime } from "@/lib/utils";

const ProgramsPage = () => {
  const { dateString, timeString, weekday } = parseDateTime(
    new Date().toISOString()
  );
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="برنامه و ایدوئولوژی" />
          </div>
          {/*  buttons */}
          <div className="flex overflow-hidden lg:hidden gap-2 items-stretch">
            <HomeButton />
            <AuthDialog />
          </div>
        </div>
        <div className="mt-6 lg:mt-0 text-[12px] lg:text-[16px] text-primary-black">
          <div className="flex items-center gap-2">
            <div>{weekday}</div>
            <div className="flex items-center gap-2">
              <span>{timeString}</span>
              <span className="h-[15px] border-r-2 border-primary-black mb-1"></span>
              <span>{dateString}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 lg:mt-8">
        <p className="text-[14px] lg:text-[20px] font-light text-primary-black">
          رزومه‌ها معمولاً به چهار روش نوشته می‌شوند: به ترتیب زمانی
          (Chronological): در این نوع رزومه، سابقه شغلی‌تان را بر اساس تاریخ
          می‌نویسید. در این رزومه، معمولاً آخرین سوابق شغلی در ابتدای رزومه
          نوشته می‌شوند. تهیه رزومه Chronological، راحت‌ترین و رایج‌ترین روش
          تهیه رزومه است. رزومه‌ای که به ترتیب زمانی نوشته شده باشد معمولاً
          پرجزئیات، قابل فهم و زندگینامه‌گونه هستند و برای دانشجویانی که سابقه
          کاری خوبی نیز دارند بسیار مفید هستند. عملکردی (Functional): این نوع
          رزومه‌ها معمولاً برای موقعیت‌های شغلی خاص ایجاد می‌شوند. در این نوع
          رزومه، کارجو سعی می‌کند تا تنها بر روی مهارت‌ها و سوابقی تمرکز کند که
          با موقعیت شغلی فعلی در ارتباط هستند. این نوع رزومه برای موقعیت‌های
          شغلی مدیریتی بسیار کاربردی است.زایر هاوایی آخرین ایالت ثبت‌شده مابین
          آمریکا هستند. مناطقی که در قسمت مرکزی اقیانوس آرام واقع شده‌اند و از
          پرطرفدارترین مقصدهای تفریحی مردم دنیا به‌حساب می‌آیند. مهم‌ترین شهر و
          پایتخت مجمع‌الجزایز هاوایی «هونولولو» نام دارد. هشت جزیره اصلی هاوائی
          اوآهو، مائوئی، کائوآئی، لانائی، مولوکای، نیهاو و کاهولاوی نامیده
          می‌شوند. جزایر هاوائی با میزبانی از کوه‌های آتشفشانی، آبشارهای زیبا و
          پارک‌های ملی در کنار ارائه منظرهای آبی تماشایی (چه خارج و چه داخل آب)
          به «بهشتِ جزیره‌ها» معروف شده است. همراه کجارو باشید که در تازه‌ترین
          قسمت از تورهای مجازی قرار است به‌جزایر هاوائی سفر کنیم. به گزارش
          خبرنگار سیاسی خبرگزاری فارس، جمعه گذشته (۱۲ آبان‌ماه) بود که سید حسن
          نصرالله، دبیرکل حزب‌الله لبنان پس از گذشت ۲۸ روز از آغاز نبرد حماس
          علیه رژیم صهیونیستی، در بیروت سخنرانی کرد. دبیرکل حزب‌الله لبنان در
          بخشی از این سخنرانی خطاب به آمریکا هشدار داد؛ «ناوهای شما در دریای
          مدیترانه ما را نمی‌ترساند و هیچگاه ما را نخواهد ترساند. من به شما
          می‌گویم برای ناوهایتان که با آن‌ها ما را تهدید می‌کنید
        </p>
      </div>
    </div>
  );
};

export default ProgramsPage;
