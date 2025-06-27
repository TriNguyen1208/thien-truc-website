import Demo from "../../components/ItemPost";
import UserCard from "../../components/UserCard";
import Banner from "../../components/Banner";
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook
} from 'lucide-react';
export default function Contact() {
    const navigate = useNavigate();
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
    //Cái này là của whiteButton
    const handleButton = () => {
        navigate('/lien-he')
    }
    const dataBanner = {
        title: "Liên hệ với thiên trúc",
        description: "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ ngay với đội ngũ của chúng tôi để được tư vấn và giải đáp mọi thắc mắc",
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasButton: true,
        contentButton: "Liên hệ ngay",
        handleButton: handleButton
    };
    const dataUserCard = {
        image_avatar: "https://fifpro.org/media/fhmfhvkx/messi-world-cup.jpg?rxy=0.48356841796117644,0.31512414378031967&width=1600&height=1024&rnd=133210253587130000",
        name: "Nguyễn Văn An",
        role: "Chủ Tịch",
        sdt: "0912 345 678",
        url_facebook: "https://facebook.com",
    }
    return (
        <>
            <Banner data={dataBanner} />
            <div className="container-fluid bg-[var(--light-green-banner)] py-[70px]">
                <div className="font-[600] flex justify-center text-[30px] text-[var(--dark-green)] mb-[30px]">
                    Đội ngũ của chúng tôi
                </div>
                <div className="flex justify-center flex-wrap">
                    <div className="w-[350px] mr-[20px] mb-[20px]">
                        <UserCard data={dataUserCard} />
                    </div>
                    <div className="w-[350px] mr-[20px] mb-[20px]">
                        <UserCard data={dataUserCard} />
                    </div>
                    <div className="w-[350px] mr-[20px] mb-[20px]">
                        <UserCard data={dataUserCard} />
                    </div>
                    <div className="w-[350px] mr-[20px] mb-[20px]">
                        <UserCard data={dataUserCard} />
                    </div>
                    <div className="w-[350px] mr-[20px] mb-[20px]">
                        <UserCard data={dataUserCard} />
                    </div>
                    <div className="w-[350px] mr-[20px] mb-[20px]">
                        <UserCard data={dataUserCard} />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        Lien he ve chung toi 
                    </div>
                    <div>
                        Bạn có dự án trong đầu hoặc muốn tìm hiểu thêm về dịch vụ của chúng tôi? Điền vào biểu mẫu hoặc liên hệ trực tiếp với chúng
tôi qua thông tin bên dưới.
                    </div>
                    <div>
                        <div>
                             <Mail className="w-5 h-5 text-[var(--green-bg)]" />
                        </div>
                        <div>
                            <div>
                                Email 
                            </div>
                            <div>
                                Lien he@gmail.com
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                             <Mail className="w-5 h-5 text-[var(--green-bg)]" />
                        </div>
                        <div>
                            <div>
                                Email 
                            </div>
                            <div>
                                Lien he@gmail.com
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                             <Mail className="w-5 h-5 text-[var(--green-bg)]" />
                        </div>
                        <div>
                            <div>
                                Email 
                            </div>
                            <div>
                                Lien he@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    Form 
                </div>
            </div>
        </>
    )
}
    // <Mail className="w-5 h-5 text-gray-600" />
    //         <Phone className="w-5 h-5 text-blue-500" />
    //         <MapPin className="w-5 h-5 text-red-500" />
    //         <Clock className="w-5 h-5 text-yellow-500" />
    //         <Facebook className="w-5 h-5 text-blue-700" />


{/* <form class="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
    <h2 class="text-2xl font-bold text-center text-gray-800">Đăng ký</h2>

    <div>
      <label class="block text-gray-700 font-medium mb-1">Email</label>
      <input
        type="email"
        class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="nhapemail@gmail.com"
        required
      />
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-1">Mật khẩu</label>
      <input
        type="password"
        class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="********"
        required
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      Đăng ký
    </button>
  </form> */}