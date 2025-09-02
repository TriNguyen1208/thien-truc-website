import ItemByType from "@/components/ItemByType";
import ListType from "@/components/ListType";

const NewsToolbar = ({
  sortOptions,
  currentSortBy,
  onSortChange,
  categories,
  currentFilter,
  onFilterChange,
}) => {
  const currentSortIndex = sortOptions.findIndex(opt => opt.value === currentSortBy);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-0">
      <div className="lg:flex-1" />
      <div className="flex justify-center px-4">
        <ItemByType
          types={sortOptions.map(opt => opt.label)}
          handleClick={onSortChange}
          current={currentSortIndex}
        />
      </div>
      <div className="flex-1 flex justify-end px-4">
        <ListType
          categories={categories}
          handleClick={onFilterChange}
          current={currentFilter}
        />
      </div>
    </div>
  );
};

export default NewsToolbar;