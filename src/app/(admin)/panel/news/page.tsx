import PanelPagesLayout from "@/components/panel/PagesLayout";
import AddNewsForm from "@/components/panel/news/AddNewsForm";

const NewsPage = () => {
  return (
    <PanelPagesLayout navbar={"برای بخش اخبار سایت موارد زیر را کامل کنید"}>
      <AddNewsForm />
    </PanelPagesLayout>
  );
};

export default NewsPage;
