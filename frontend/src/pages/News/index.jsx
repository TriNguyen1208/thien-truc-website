import { useState } from "react";
import Banner from "../../components/Banner";
import useNews from "../../redux/hooks/useNews";
import Loading from "@/components/Loading";
import ItemByType from "./components/ItemByType";
import ListType from "./components/ListType";
import ItemPost from "../../components/ItemPost";
import GreenButton from "../../components/GreenButton";
import ViewMoreButton from "../../components/ViewMoreButton";
import { Spin } from 'antd'
import {Link, useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import Paging from "../../components/Paging";

export default function News() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBys = ["date_desc", "popular"];
  const [category, setCategory] = useState("Chọn thể loại");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [indexSort, setIndexSort] = useState(0);
  const handleButton = (category, query) => {
    setQuery(query)
    setCategory(category);
    setCurrentPage(1)
  };
  const handleEnter = (id) => {
    navigate(`/tin-tuc/${id}`);
  }
  const handleSearchSuggestion = (query, filter) => {
    return useNews.getSearchSuggestions(query, filter);
  };
  const handleClickCategory = (category) => {
    setCategory(category)
    setCurrentPage(1)
  }
  const handlePageChange = (page) => {
    console.log('Trang hiện tại:', page);
    setCurrentPage(page);
  };
  const { data: newsPage, isLoading: isLoadingNewsPage } = useNews.getNewsPage();
  const { data: newsCategory, isLoading: isLoadingCategory } = useNews.news_categories.getAll();
  const { data: dataFilter, isLoading: isLoadingDataFilter } = useNews.news.getList(
    query,
    category === "Chọn thể loại" ? undefined : category,
    sortBys[indexSort],
    currentPage
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
    handleEnter: handleEnter
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
              handleClick={(index) => setIndexSort(index)}
              current={indexSort}
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
            dataFilter.results?.map((item, index) => {
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
          { isLoadingDataFilter ? <></> : <Paging data={{numberPagination: Math.ceil(dataFilter.totalCount / 9)}} onPageChange={handlePageChange} currentPage={currentPage}/>}
        </div>
      </div>
    </>
  );
}
