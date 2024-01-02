import PanelPagesLayout from "@/components/panel/PagesLayout";
import AddWealthForm from "@/components/panel/wealth/AddWealthForm";

const NewsPage = () => {
  return (
    <PanelPagesLayout navbar={"برای بخش شفافیت اموال موارد زیر را کامل کنید"}>
      <AddWealthForm />
    </PanelPagesLayout>
  );
};

export default NewsPage;
