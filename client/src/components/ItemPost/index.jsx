import React from 'react';
import {
    EnvironmentOutlined,
    CalendarOutlined,
    EyeOutlined,
    ShareAltOutlined,
    MailOutlined
} from '@ant-design/icons';
import ShareButton from '@/components/ShareButton';
import LazyLoad from 'react-lazyload';

const ItemPost = ({ data, id= ""}) => {
    const {
        type, // 'project' hoặc 'news'
        title,
        description,
        location, //project
        date, //project và news
        tag,
        tagColor = '#ef4444',
        image,
        status,
    } = data;

    const renderTag = () => {
        if (!tag) return null;

        return (
            <div className={`absolute top-3 left-3  text-white px-3 py-1 rounded-full text-sm font-medium`} style={{ backgroundColor: tagColor }}>
                {tag}
            </div>
        );
    };

    const renderImage = () => (
        <div className="relative w-full  h-60 bg-gray-200 rounded-t-lg overflow-hidden">
            {image ? (
                <LazyLoad
                    height={200}
                    offset={100}
                    throttle={100}
                    once
                    placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
                    style={{width: '100%', height: '100%'}}
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </LazyLoad>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <MailOutlined style={{ fontSize: '48px', color: '#9CA3AF' }} />
                </div>
            )}
            {renderTag()}
        </div>
    );

    const renderContent = () => (
        <>
            <div className="p-4 flex-1 relative">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 break-words">
                    {title}
                </h3>

                {description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-5 break-words">
                        {description}
                    </p>
                )}
            </div>
            <div className='bottom-3 left-0 absolute w-full px-4'>

                {/* Location và Date */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-2 gap-3 sm:gap-0">
                    {location && (
                        <div className="flex items-center gap-1">
                            <EnvironmentOutlined style={{ fontSize: '16px' }} />
                            <span>{location}</span>
                        </div>
                    )}

                    {date && (
                        <div className="flex items-center gap-1">
                            <CalendarOutlined style={{ fontSize: '16px' }} />
                            {date && (
                                type === 'project' ? (
                                    <span>Hoàn thành {date.split('T')[0]}</span>
                                ) : (
                                    <span>{date.split('T')[0]}</span>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* status cho news posts */}
                {type === 'news' && status && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        {/* <span>{status.date}</span> */}
                        <div className="flex flex-col gap-2">
                            <span>{status.date}</span>
                            <div className='flex items-center gap-4'>
                                <span>{status.duration}</span>
                                <div className="flex items-center gap-1">
                                    <EyeOutlined style={{ fontSize: '16px' }} />
                                    <span>{status.views}</span>
                                </div>
                            </div>
                        </div>
                        <ShareButton id={id}/>
                    </div>
                )}
            </div>
        </>

    );

    return (
        <div
            className="w-full bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-102 transition-transform transition-shadow duration-200 overflow-hidden cursor-pointer h-120 relative"
           
        >
            {renderImage()}
            {renderContent()}
        </div>

    );
};

export default ItemPost;