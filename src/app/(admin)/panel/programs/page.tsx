import AddProgramsForm from "@/components/Forms/AddProgramsForm";
import PanelPagesLayout from "@/components/panel/PagesLayout";

const ProgramsPage = async () => {
  const programsDataReq = await fetch(
    `${process.env.WebUrl}/api/programs/getPrograms`,
    {
      next: {
        tags: ["programs"],
      },
      method: "POST",
    }
  );
  const programsData = await programsDataReq.json();
  return (
    <PanelPagesLayout
      navbar={"برای بخش برنامه و ایدئولوژی موارد زیر را کامل کنید"}
    >
      <AddProgramsForm defaultValue={programsData.Data.Description} />
    </PanelPagesLayout>
  );
};

export default ProgramsPage;
