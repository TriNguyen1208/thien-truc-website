import Banner from "@/components/Banner";
import useNews from "@/hooks/useNews";
import Loading from "@/components/Loading";
import ItemByType from "@/components/ItemByType";
import ListType from "@/components/ListType";
import ItemPost from "@/components/ItemPost";
import { Link, useLocation, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import Paging from "@/components/Paging";
import { useRef } from "react";
import ComingSoon from '@/pages/ComingSoon'

export default function News() {
  const scrollTargetRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const sortBys = ["date_desc", "popular"];

  // Lấy giá trị từ URL và kiểm tra hợp lệ
  const query = searchParams.get("query") || "";
  const limit = searchParams.get('limit') || "";

  const rawSortBy = searchParams.get("sort_by");
  const sortBy = sortBys.includes(rawSortBy) ? rawSortBy : "date_desc";

  const rawPage = parseInt(searchParams.get("page"));
  const currentPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  // Gọi API danh mục trước để có categories hợp lệ
  const { data: newsPage, isLoading: isLoadingNewsPage } = useNews.getNewsPage();
  const { data: newsfilter, isLoading: isLoadingfilter } = useNews.news_categories.getAll();

  // Lúc này mới tạo categories (sau khi có newsfilter)
  const categories = [
    "Tất cả thể loại",
    ...(newsfilter?.map((filter) => filter.name) ?? []),
  ];
  const rawFilter = searchParams.get("filter");
  const filter = rawFilter && categories.includes(rawFilter) ? rawFilter : "Tất cả thể loại";
  // Gọi API với params đã xử lý
  const { data: dataFilter, isLoading: isLoadingDataFilter } = useNews.news.getList(
    query,
    filter === "Tất cả thể loại" ? undefined : filter,
    true,
    sortBy,
    currentPage,
    limit
  );
  if (isLoadingNewsPage || isLoadingfilter) return <Loading />;
  // Gọi API với params từ URL

  // Helper cập nhật URL
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    if (key !== "page") newParams.set("page", "1");
    setSearchParams(newParams);
  };

  // Handlers
  const handleButton = (filter, query) => {
    const newParams = new URLSearchParams();
    newParams.set("query", query);
    newParams.set("filter", filter);
    newParams.set("sort_by", sortBy);
    newParams.set("page", "1");
    setSearchParams(newParams);
    setTimeout(() => {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleEnter = (id) => {
    navigate(`/tin-tuc/${id}`);
  };

  const handleSearchSuggestion = (query, filter) => {
    return useNews.getSearchSuggestions(query, filter);
  };

  const handleClickfilter = (filter) => {
    updateParam("filter", filter);
    setTimeout(() => {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handlePageChange = (page) => {
    updateParam("page", String(page));
    setTimeout(() => {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleSortChange = (index) => {
    const newSort = sortBys[index];
    updateParam("sort_by", newSort);
    setTimeout(() => {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  const bannerData = {
    title: newsPage.banner_title,
    description: newsPage.banner_description,
    colorBackground: "var(--gradient-banner)",
    colorText: "#ffffff",
    hasSearch: newsPage.is_visible ? true : false,
    categories: categories,
    contentPlaceholder: "Nhập vào đây",
    currentQuery: query,
    currentCategory: filter,
    handleButton: handleButton,
    handleSearchSuggestion: handleSearchSuggestion,
    handleEnter: handleEnter,
    scrollTargetRef: scrollTargetRef
  };

  return (
    <>
      {navigation.state == 'loading' && <Loading/>}
      <Banner data={bannerData} />
      {newsPage.is_visible ? <div className="container-fluid flex flex-col gap-10 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-0 ">
          <div className="lg:flex-1 justify-center" />
          <div className="flex justify-center px-4">
            <ItemByType
              types={["Mới nhất", "Phổ biến"]}
              handleClick={handleSortChange}
              current={sortBys.indexOf(sortBy)}
            />
          </div>
          <div className="flex-1 flex justify-end px-4">
            <ListType
              categories={categories}
              handleClick={handleClickfilter}
              current={filter}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 md:gap-10">
          {isLoadingDataFilter ? (
            <Loading/>
          ) : (
            dataFilter.results?.map((item) => {
              const data = {
                type: "news",
                title: item.title,
                description: item.main_content,
                tag: item.category.name,
                tagColor: item.category.rgb_color,
                image: item.main_img,
                status: {
                  duration: `${item.measure_time} phút đọc`,
                  views: item.num_readers,
                  date: item.public_date
                },
              };
              return (
                <Link to={`${location.pathname}/${item.id}`} key={item.id}
                className="col-span-12 lg:col-span-4 md:col-span-6 max-md:max-w-[500px] max-md:w-full  max-md:mx-auto"
                >
                  <ItemPost data={data} id={item.id}/>
                </Link>
              );
            })
          )}
        </div>

        <div className="flex flex-row justify-center mb-20">
          {!isLoadingDataFilter && (
            <Paging
              data={{
                numberPagination: Math.ceil(dataFilter.totalCount / 9),
              }}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>: <ComingSoon/>}
    </>
  );
}