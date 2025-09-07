import ComingSoon from '@/pages/ComingSoon';
import Paging from "@/components/Paging";
import NewsToolbar from './NewsToolbar';
import NewsGrid from './NewsGrid';

const NewsContent = ({
  scrollTargetRef,
  isVisible,
  isLoading,
  filteredData,
  params,
  updateParams,
  categories,
  sortOptions,
  itemsPerPage,
  location,
}) => {
  if (!isVisible) {
    return <ComingSoon />;
  }

  const totalPages = Math.ceil((filteredData?.totalCount || 0) / itemsPerPage);

  return (
    <div ref={scrollTargetRef} className="container-fluid flex flex-col gap-10 pt-10">
      <NewsToolbar
        sortOptions={sortOptions}
        currentSortBy={params.sortBy}
        onSortChange={(index) => updateParams({ sort_by: sortOptions[index].value }, scrollTargetRef)}
        categories={categories}
        currentFilter={params.filter}
        onFilterChange={(filter) => updateParams({ filter }, scrollTargetRef)}
      />

      <div className="grid grid-cols-12 gap-5 md:gap-10">
        <NewsGrid
          isLoading={isLoading}
          newsItems={filteredData?.results}
          pathname={location.pathname}
        />
      </div>

      <div className="flex flex-row justify-center mb-20">
        {!isLoading && totalPages > 1 && (
          <Paging
            data={{ numberPagination: totalPages }}
            onPageChange={(page) => updateParams({ page: String(page) }, scrollTargetRef)}
            currentPage={params.page}
          />
        )}
      </div>
    </div>
  );
};

export default NewsContent;