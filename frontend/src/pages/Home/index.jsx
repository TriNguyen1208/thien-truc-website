import useHome from "@/redux/hooks/useHome"
import useAboutUs from "@/redux/hooks/useAboutUs"
import useContact from "@/redux/hooks/useContact"
import useNews from "@/redux/hooks/useNews"
import useProducts from "@/redux/hooks/useProducts"
import useProjects from "@/redux/hooks/useProjects"
import useRecruitment from "@/redux/hooks/useRecruitment"
import PostCategory from "../../components/PostCategory"
//Ví dụ chill chill
export default function Home(){

    const categories = [
        'Tất cả',
        'Miền Bắc',
        'Miền Trung',
        'Miền Nam',
        'Miền Tây',
    ]
    return (
        <>
            <PostCategory categories= {categories} />
        </>
    )
}