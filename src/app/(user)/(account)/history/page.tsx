import VotesClarityPageSearchForm from "@/components/Forms/VotesClarityPageSearchForm";
import HomeButton from "@/components/shared/Buttons/HomeButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { DataTable } from "./data-table";
import AuthDialog from "@/components/shared/AuthDialog";
import { TicketsHistory, columns } from "./columns";

const data: TicketsHistory[] = [
  {
    CreatedAt: "2023-12-29T16:18:35.7912977Z",
    Id: 32,
    Status: 0,
    TicketCategory: {
      Title: "درد دل",
      Id: 2,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "درد دل",
    TrackingCode: 500205,
    Description: "درد دل",
  },
  {
    CreatedAt: "2023-12-29T15:51:19.5908396Z",
    Id: 31,
    Status: 1,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "test",
    TrackingCode: 229924,
    Description: "test",
  },
  {
    CreatedAt: "2023-12-29T15:28:09.2007854Z",
    Id: 30,
    Status: 0,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "درخواست جدید",
    TrackingCode: 399404,
    Description: "فرم درخواست جدید",
  },
  {
    CreatedAt: "2023-12-29T15:27:44.2832274Z",
    Id: 29,
    Status: 0,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "درخواست جدید",
    TrackingCode: 374525,
    Description: "فرم درخواست جدید",
  },
  {
    CreatedAt: "2023-12-29T15:26:17.9530761Z",
    Id: 28,
    Status: 0,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "درخواست جدید",
    TrackingCode: 926591,
    Description: "undefined",
  },
  {
    CreatedAt: "2023-12-28T20:48:55.2474826Z",
    Id: 27,
    Status: 1,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "صنعت و معدن ",
    TrackingCode: 900270,
    Description: "sadfasdfasdf",
  },
  {
    CreatedAt: "2023-12-28T20:47:23.7835996Z",
    Id: 26,
    Status: 3,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "فرهنگی ",
    TrackingCode: 985426,
    Description: "sadfasdfsdf",
  },
  {
    CreatedAt: "2023-12-28T15:33:01.1939276Z",
    Id: 25,
    Status: 3,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "فرهنگی ",
    TrackingCode: 286936,
    Description: "new",
  },
  {
    CreatedAt: "2023-12-28T15:30:40.8948121Z",
    Id: 24,
    Status: 3,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "صنعت و معدن ",
    TrackingCode: 484314,
    Description: "asdasdfasdf",
  },
  {
    CreatedAt: "2023-12-28T15:22:08.4380918Z",
    Id: 23,
    Status: 3,
    TicketCategory: {
      Title: "درد و دل",
      Id: 1,
    },
    User: {
      Id: 3,
      Name: "محمدمهدی",
      Family: "متقی",
      Mobile: "09120786876",
      NationalCode: "0375555555",
    },
    Title: "سایر ",
    TrackingCode: 265028,
    Description: "tes t cache 6",
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
      <div className="w-full lg:max-w-[800px] mx-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default VotesClarity;
