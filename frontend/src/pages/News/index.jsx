import { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import useNews from "../../redux/hooks/useNews";
import Loading from "@/components/Loading";
import ItemByType from "./components/ItemByType";
import ListType from "./components/ListType";
import ItemPost from "../../components/ItemPost";
import GreenButton from "../../components/GreenButton";
import ViewMoreButton from "../../components/ViewMoreButton";
import { Spin } from 'antd'
import {Link, useLocation} from 'react-router-dom'
export default function News() {
  const types = ["date_desc", "popular"];
  const [type, setType] = useState(types[0]);
  const [category, setCategory] = useState("Chọn thể loại");
  const location = useLocation();
  // const [query, setQuery] = useState("");
  const handleButton = (category, query) => {
    setCategory(category);
    // console.log(category, query); //category với query là chọn thể loại vơi cái đang nhập. enter hay nhan tim kiem gi cũng ra
  };
  //Note: Nếu như chọn cái đã gợi ý thì vào thẳng trang chi tiết sản phẩm luôn. Nếu như nhập bàn phím thì trả về 1 list các news để render ra

  const handleSearchSuggestion = (query, filter) => {
    return useNews.getSearchSuggestions(query, filter);
  };
  const handleClickCategory = (category) => {
    setCategory(category)
  }
  const { data: newsPage, isLoading: isLoadingNewsPage } = useNews.getNewsPage();
  const { data: newsCategory, isLoading: isLoadingCategory } = useNews.news_categories.getAll();
  const { data: dataFilter, isLoading: isLoadingDataFilter } = useNews.getAllByFilter(
    type,
    category === "Chọn thể loại" ? "" : category
  );
  if (isLoadingNewsPage || isLoadingCategory) return <Loading />;

  const categories = [
    "Chọn thể loại",
    ...newsCategory.map((category) => category.name),
  ];

  const data = {
    title: newsPage.banner_title,
    description: newsPage.banner_description,
    colorBackground: "var(--gradient-banner)",
    colorText: "#ffffff",
    hasSearch: true,
    categories: categories,
    contentPlaceholder: "Nhập vào đây",
    handleButton: handleButton,
    handleSearchSuggestion: handleSearchSuggestion,
  };
  return (
    <>
      <div className="w-screen">
        <Banner data={data} />
      </div>
      <div className="container-fluid flex flex-col gap-10 pt-10">
        <div className="flex flex-row items-center">
          <div className="flex-1" />
          <div className="flex-shrink-0">
            <ItemByType
              types={["Mới nhất", "Phổ Biến"]}
              handleClick={(index) => setType(types[index])}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <ListType
              categories={categories}
              handleClick={handleClickCategory}
              current={category}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 mx-auto px-4">
          {isLoadingDataFilter ? (
            <Spin tip={<span className="text-3xl font-semibold">Đang tải...</span>} size="large" >
              <div className="p-10 w-[400px] h-[400px] rounded-sm" />
            </Spin>
          ) : (
            dataFilter?.map((item, index) => {
                const data = {
                  type: "news",
                  title: item.title,
                  description: item.main_content,
                  tag: item.category.name,
                  tagColor: item.category.rgb_color,
                  image: item.main_img,
                  status: {
                      duration: String(item.measure_time) + " phút đọc",
                      views: item.num_readers,
                  },
                };
                return (
                  <Link to={`${location.pathname}/${item.id}`} key={item.id}>
                    <ItemPost data={data} />
                  </Link>
                );
            }
            )
          )}
        </div>
        <div className="flex flex-row justify-center mb-20">
            <div className="w-[150px]">
              <ViewMoreButton content='Xem thêm' handleClick={() => console.log("hello wolrd")}/>
            </div>
        </div>
      </div>
    </>
  );
}
