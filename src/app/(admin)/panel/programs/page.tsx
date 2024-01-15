import AddProgramsForm from "@/components/Forms/AddProgramsForm";
import PanelPagesLayout from "@/components/panel/PagesLayout";

const ProgramsPage = () => {
  return (
    <PanelPagesLayout
      navbar={"برای بخش برنامه و ایدئولوژی موارد زیر را کامل کنید"}
    >
      <AddProgramsForm />
    </PanelPagesLayout>
  );
};

export default ProgramsPage;
