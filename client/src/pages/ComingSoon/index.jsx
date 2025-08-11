import React from 'react';

export default function UpdatingPage() {
  return (
    <div 
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br text-white px-4"
        style={{ backgroundImage: "#ffffff" }}
    >
      <h1 className="text-5xl font-extrabold mb-4 animate-pulse text-green-900"><span className='hidden md:inline-block'>🚧</span> Đang Cập Nhật <span className='hidden md:inline-block'>🚧</span></h1>
      <p className="text-xl mb-8 max-w-xl text-center font-bold text-green-900">
        Chúng tôi đang làm mới nội dung để mang lại trải nghiệm tốt hơn cho bạn.
        Vui lòng quay lại sau nhé!
      </p>
      <div className="w-24 h-24 border-8 border-green-900 border-t-transparent rounded-full animate-spin "></div>
    </div>
  );
}