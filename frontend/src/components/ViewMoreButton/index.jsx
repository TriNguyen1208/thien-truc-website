const ViewMoreButton = ({ data}) => {
  return (
  
<button className="bg-white text-(--green-bg) px-4 py-2 rounded border border-green-600 hover:bg-(--green-bg) hover:text-white">
  {data} &gt;
</button>
  );
};

export default ViewMoreButton;