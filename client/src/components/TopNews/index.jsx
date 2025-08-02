// src/components/TopNews.jsx
import React from 'react';
import { useState, useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';
import useNews from "@/hooks/useNews";
import LazyLoad from 'react-lazyload';
const TopNews = () => {
  const { data: topNews, isLoading, error } = useNews.getHighlightNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 3500; // 3.5 giây
  const navigate = useNavigate();

  useEffect(() => {
    if (!topNews || topNews.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topNews.length);
    }, intervalTime);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, [topNews]);
  
  if (isLoading) return <div>Đang tải tin nổi bật...</div>;
  if (error) return <div>Không thể tải tin tức. Vui lòng thử lại sau.</div>;
  if (!topNews || topNews.length === 0) return <div>Không có tin tức nổi bật.</div>;

  const currentNews = topNews?.[currentIndex];

  return (
    <section className="highlight-news">
        <div className="top-news-carousel-container" onClick={() => {
          navigate(`tin-tuc/${currentNews.id}`)
        }}>
        <div className="news-card-wrapper" key={currentNews.id}>
            <div className="news-card">
              <LazyLoad
                  height={200}
                  offset={100}
                  throttle={100}
                  once
                  placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
              >
                <img src={currentNews.main_img} alt={currentNews.title}/>
              </LazyLoad>
              <div className="card-content">
                  <h3>{currentNews.title}</h3>
                  <p>{currentNews.main_content}</p>
              </div>
            </div>
        </div>
        </div>
    </section>
    );
}

 export default TopNews;
