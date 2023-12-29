import TicketsPageMainLayout from "@/components/TicketsPage/MainLayout";

const TicketsPage = async ({
  searchParams,
  children,
}: {
  searchParams: {
    [key: string]: string;
  };
  children?: React.ReactNode;
}) => {
  // const session = await getServerSession(nextAuthOptions);

  return <></>;
};

export default TicketsPage;
