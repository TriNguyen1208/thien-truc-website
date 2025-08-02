import React from 'react';
import { Phone } from 'lucide-react';
import LazyLoad from 'react-lazyload';
const UserCard = ({ data }) => {
  const {
    image_avatar,
    name,
    role,
    sdt,
    url_facebook
  } = data || {}
  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-2xl border-2 border-green-200 p-6  shadow-md transform transition duration-300 hover:shadow-xl hover:scale-101 "
    >
      <div>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {image_avatar ? (
              <LazyLoad
                height={200}
                offset={100}
                throttle={100}
                once
                placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
                style={{ width: '100%', height: '100%' }}
              >
                <img
                  src={image_avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </LazyLoad>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">👤</span>
              </div>
            )}
          </div>
        </div>
        <h2 className="line-clamp-1 text-center text-xl font-semibold text-gray-800 mb-1">
          {name}
        </h2>

        {/* Role */}
        <p className="line-clamp-1 text-center text-green-600 font-medium mb-6">
          {role || '\u00A0'}
        </p>

        {/* Phone */}
        <div className="line-clamp-1 flex items-center justify-center mb-4 text-gray-700">
          <Phone className="w-4 h-4 mr-2" />
          <span>{sdt}</span>
        </div>

      </div>
      <div>
        {/* Facebook Button */}
        <div className="w-full">
          <a
            href={url_facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-100 hover:bg-green-200 transition-colors duration-200 rounded-lg py-3 px-4 flex items-center justify-center text-gray-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard 