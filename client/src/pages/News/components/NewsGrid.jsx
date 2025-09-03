import { Link } from "react-router-dom";
import ItemPost from "@/components/ItemPost";
import Loading from "@/components/Loading";

const NewsGrid = ({ isLoading, newsItems = [], pathname }) => {
  if (isLoading) {
    // Hiển thị loading ngay trong grid để giữ layout
    return <div className="col-span-12"><Loading /></div>;
  }
  
  if (newsItems.length === 0) {
    return <div className="col-span-12 text-center py-10">Không tìm thấy bài viết nào.</div>
  }

  return (
    <>
      {newsItems.map((item) => (
        <Link
          to={`${pathname}/${item.id}`}
          key={item.id}
          className="col-span-12 lg:col-span-4 md:col-span-6 max-md:max-w-[500px] max-md:w-full max-md:mx-auto"
        >
          <ItemPost data={{
            type: "news",
            title: item.title,
            description: item.main_content,
            tag: item.category.name,
            tagColor: item.category.rgb_color,
            image: item.main_img,
            status: {
              duration: `${item.measure_time} phút đọc`,
              views: item.num_readers,
              date: item.public_date
            },
          }} id={item.id} />
        </Link>
      ))}
    </>
  );
};

export default NewsGrid;