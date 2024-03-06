import VotesClarityPageSearchForm from "@/components/Forms/VotesClarityPageSearchForm";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { DataTable } from "./data-table";
import { VotesClarity, columns } from "./columns";
import AuthDialog from "@/components/shared/AuthDialog";

const data: VotesClarity[] = [
  {
    id: "728ed52f",
    title:
      "مواد ارجاعی- ماده 35 و اجزای آن لایحه برنامه هفتم توسعه جمهموری اسلامی ایران",
    date: "1402/09/12",
    parliamentCode: "121516",
    status: "agreed",
  },
  {
    id: "728easdd52f",
    title:
      "پیشنهاد آقای دلیگانی - حذف کل- ماده 35 لایحه هفتم توسعه جمهموری اسلامی ایران",
    date: "1402/09/12",
    parliamentCode: "121516",
    status: "against",
  },
  {
    id: "728edsd52f",
    title:
      "ماده 88 بند ث-فصل 19-نظام آموزشی لایحه برنامه هفتم توسعه جمهوری اسلامی ایران",
    date: "1402/09/12",
    parliamentCode: "121516",
    status: "abstain",
  },
  {
    id: "728efsxd52f",
    title:
      "ماده 88 بند ث-فصل 19-ارتقاء نظام آموزشی برنامه هفتم توسعه جمهوری اسلامی ایران",
    date: "1402/09/12",
    parliamentCode: "121516",
    status: "agreed",
  },
];

const VotesClarity = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  // console.log(searchParams);
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle title="لیست آرا" />
          </div>
        </div>
        <div className="mt-6 lg:mt-0">
          <VotesClarityPageSearchForm />
        </div>
      </div>
      <div className="mt-8">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default VotesClarity;
