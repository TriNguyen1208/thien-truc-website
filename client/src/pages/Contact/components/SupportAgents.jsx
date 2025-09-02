import UserCard from "@/components/UserCard";

// Đội ngũ hỗ trợ
export default function SupportAgents({ supportAgentsData }) {

    return (
        <section className="container-fluid bg-[var(--light-green-banner)] py-[70px]">
             <h2 className={`font-[600] flex justify-center text-[30px] text-[var(--dark-green)] mb-[30px]`}>
                Đội ngũ của chúng tôi
            </h2>
            <div className="grid grid-cols-12 gap-6">
                {(supportAgentsData || []).map((item) => {
                    const dataUserCard = {
                        image_avatar: item.avatar_img,
                        name: item.name,
                        role: item.role,
                        sdt: item.phone_number,
                        url_facebook: item.facebook_url,
                    }
                    return (
                        <div key={item.id} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-[320px]" >
                            <UserCard data={dataUserCard} />
                        </div>
                    )
                })}
            </div>
        </section>
    );
}
