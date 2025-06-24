import Demo from "../../components/ItemPost";

export default function Contact(){
    const projectData = {
    type: 'project',
    title: 'Trung tâm thương mại Golden Plaza',
    description: 'Trung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang. Trung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang.\t\t\tAbc Trung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang. Trung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang.\t\t\tAbcTrung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang. Trung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang.\t\t\tAbcTrung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang. Trung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang.\t\t\tAbcTrung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang. Trung tâm thương mại 10 tầng với diện tích 60,000m² được thiết kế hiện đại, sang.\t\t\tAbc ',
    location: 'Hải Châu, Đà Nẵng',
    date: '2024',
    tag: 'Miền Bắc',
    tagColor: '#10B981',
    image: ""
};


const newsData = {
    type: 'news',
    title: 'Mở Rộng Chi Nhánh Mới Tại Đà Nẵng',
    description: 'Công ty Thiên Trúc chính thức khai trương chi nhánh mới tại Đà Nẵng, mở rộng mạng lưới phục vụ khách hàng khu vực miền Trung với dịch vụ lắp đặt LED chuyên nghiệp.',
    date: '2025-06-08T17:00:00.000Z',
    tag: 'Công Ty',
    tagColor: '#3B82F6',
    status: {
        duration: '4 phút đọc',
        views: '858'
    },
    image: ""
};

    return (
        <>
        <div className="w-xl">
            
            <Demo data={newsData} />
            <p>Đây là nội dung trang liên hệ.</p>
        </div>
        </>
    )
}