import UserCard from "@/components/UserCard";

const devTeam = [
    {
        name: "Huỳnh Gia Âu",
        role: ["Project Manager", "UI Designer", "Database Designer", "Backend Developer", "Tester"],
        avatar_img: "https://res.cloudinary.com/djyicm00q/image/upload/v1757130630/ch%C3%A2n_dung_HGA_vck4g7.jpg",
        phone_number: "(+84) 972 066 777",
        email_url: "huynhgiaau27112005@gmail.com",
        facebook_url: "https://web.facebook.com/thoriedgold790",
    },
    {
        name: "Đỗ Văn Hà",
        role: ["Fullstack Developer", "UI Designer", "Database Designer", "Tester"],
        avatar_img: "https://res.cloudinary.com/djyicm00q/image/upload/v1757152197/8f647c5f899102cf5b80_c5lset.jpg",
        phone_number: "(+84) 389 368 141",
        email_url: "flazerfa123@gmail.com",
        facebook_url: "https://www.facebook.com/dvan.ha.2024",
    },
    {
        name: "Nguyễn Đức Trí",
        role: ["Fullstack Developer", "Software Architect", "UI Designer", "Database Designer", "Tester"],
        avatar_img: "https://res.cloudinary.com/djyicm00q/image/upload/v1757130769/Ảnh_chụp_màn_hình_2025-09-06_105015_pnwqsl.png",
        phone_number: "(+84) 906 640 981",
        email_url: "ductri0981@gmail.com",
        facebook_url: "https://www.facebook.com/tringuyen.0981",
    },
    {
        name: "Đỗ Nguyễn Minh Trí",
        role: ["Fullstack Developer", "Business Analyst", "UI Designer", "Tester"],
        avatar_img: "https://res.cloudinary.com/djyicm00q/image/upload/v1757151870/%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2025-09-06_164413_vbnzq2.png",
        phone_number: "(+84) 818 927 019",
        email_url: "minhtri26072005@gmail.com",
        facebook_url: "https://www.facebook.com/onguyenminhtri.559391",
    },
    {
        name: "Nguyễn Minh Luân",
        role: ["Fullstack Developer", "UI Designer", "Tester"],
        avatar_img: "https://res.cloudinary.com/djyicm00q/image/upload/v1757153383/%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2025-09-06_170929_gyfqdh.png",
        phone_number: "(+84) 362 114 115",
        email_url: "luanthuco11@gmail.com",
        facebook_url: "https://www.facebook.com/luanminh1404",
    },  
]

const TeamGrid = ({ members }) => {
  return (
    <div className="flex flex-wrap justify-center gap-14 max-w-6xl mx-auto">
      {members.map((member, index) => (
        <div 
          key={index} 
          className="w-full sm:w-1/2 lg:w-3/10 max-w-sm"
        >
          <UserCard data={member} />
        </div>
      ))}
    </div>
  )
}



export default function DevelopmentTeam() {

    return (
        <section className="container-fluid bg-[var(--light-green-banner)] py-[70px]">
             <h2 className={`font-[600] flex justify-center text-[30px] text-[var(--dark-green)] mb-[30px]`}>
                Đội ngũ phát triển Website
            </h2>
            <TeamGrid 
                members={devTeam.map((item) => ({
                image_avatar: item.avatar_img,
                name: item.name,
                role: item.role,
                sdt: item.phone_number,
                url_email: item.email_url,
                url_facebook: item.facebook_url,
                type: "dev",
                }))}
            />
        </section>
    );
}