import TicketForm from "@/components/Forms/TicketsForm";

const CategoryPage = async ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  const req = await fetch(`${process.env.WebUrl}/api/categories/all`, {
    method: "GET",
    next: { tags: ["allCategories"] },
  });
  if (!req.ok) {
    return <div>خطایی رخ داده است</div>;
  }
  const res = await req.json();

  const data = res.Data.find((item: any) => item.Id === +params.category);
  return (
    <div>
      <TicketForm data={data} />
    </div>
  );
};

export default CategoryPage;
