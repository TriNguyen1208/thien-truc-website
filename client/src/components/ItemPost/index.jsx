import React from 'react';
import {
    EnvironmentOutlined,
    CalendarOutlined,
    EyeOutlined,
    ShareAltOutlined,
    MailOutlined
} from '@ant-design/icons';
import ShareButton from '@/components/ShareButton';

const ItemPost = ({ data, id= "", width = "100%"}) => {
    const {
        type, // 'project' hoặc 'news'
        title,
        description,
        location, //project
        date, //project và news
        tag,
        tagColor = '#ef4444',
        image = "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg",
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
        <div className="relative w-full h-60 bg-gray-200 rounded-t-lg overflow-hidden">
            {image ? (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
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
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
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
                        <div className="flex items-center gap-4">
                            <span>{status.duration}</span>
                            <div className="flex items-center gap-1">
                                <EyeOutlined style={{ fontSize: '16px' }} />
                                <span>{status.views}</span>
                            </div>
                        </div>
                        {/* <ShareAltOutlined
                            style={{ fontSize: '16px', cursor: 'pointer' }}
                            className="hover:text-gray-700"
                        /> */}
                        <ShareButton id={id}/>
                    </div>
                )}
            </div>
        </>

    );

    return (
        <div
            className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-102 transition-transform transition-shadow duration-200 overflow-hidden cursor-pointer h-120 relative"
            style={{ width }}
        >
            {renderImage()}
            {renderContent()}
        </div>

    );
};

export default ItemPost;
// const projectData = {
//     type: 'project',
//     title: 'Trung tâm thương mại Golden Plaza',
//     description: 'Trung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang trọng và tiện nghi.',
//     location: 'Hải Châu, Đà Nẵng',
//     date: '2024',
//     tag: 'Miền Bắc',
//     tagColor: '#10B981',
//     image: ""
// };


// const newsData = {
//     type: 'news',
//     title: 'Mở Rộng Chi Nhánh Mới Tại Đà Nẵng',
//     description: 'Công ty Thiên Trúc chính thức khai trương chi nhánh mới tại Đà Nẵng, mở rộng mạng lưới phục vụ khách hàng khu vực miền Trung với dịch vụ lắp đặt LED chuyên nghiệp.',
//     date: '2025-06-08T17:00:00.000Z',
//     tag: 'Công Ty',
//     tagColor: '#3B82F6',
//     status: {
//         duration: '4 phút đọc',
//         views: '858'
//     }
//     image: ""
// };