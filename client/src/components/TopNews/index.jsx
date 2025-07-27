// // src/components/TopNews.jsx
// import React from 'react';
// import useNews from "@/hooks/useNews";

// const TopNews = () => {
//   const { data: topNews, isLoading } = useNews.getHighlightNews();

//   if (isLoading) return <div>Đang tải tin nổi bật...</div>;

//   return (
//     <section className="highlight-news">
//       <h2>Tin Tức Nổi Bật</h2>
//       <div className="news-grid">
//         {topNews?.map((news) => (
//           <div className="news-card" key={news.id}>
//             <img src={news.main_img} alt="main image" />
//             <h3>{news.title}</h3>
//             <p>{news.main_content}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

import React from 'react';

const TopNews = ({ news }) => {
  return (
    <div></div>
  );
}
 export default TopNews;
