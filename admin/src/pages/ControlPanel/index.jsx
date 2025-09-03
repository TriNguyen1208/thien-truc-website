import {UserIcon, PhoneIcon, BoxIcon, ProjectIcon, NewsIcon, PulseIcon} from '@/components/Icon'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useLayout} from '@/layouts/LayoutContext'
import Loading from '@/components/Loading'
import useProjects from '@/hooks/useProjects'
import useProducts from '@/hooks/useProducts'
import useNews from '@/hooks/useNews'
import useAdmin from '@/hooks/useAdmin'
import useContact from '@/hooks/useContact'
import DisplayCards from './DisplayCards'
import ItemActivity from './ItemActivity'

const ControlPanel = () => {
    //============= API ================
    const { data: quantityProject, isLoading: isLoadingQuantityProject} = useProjects.getQuantity()
    const { data: quantityProduct, isLoading: isLoadingQuantityProduct} = useProducts.getQuantity()
    const { data: quantityNews, isLoading: isLoadingQuantityNews} = useNews.getQuantity()
    const { data: quantityAdmin, isLoading: isLoadingQuantityAdmin} = useAdmin.getQuantity()
    const { data: quantityContact, isLoading: isLoadingQuantityContact} = useContact.getQuantity()
    const { data: activityLogs, isLoading: isLoadingActivity} = useAdmin.getActivityLogs()

    //============ Set layout =====================
    const {setLayoutProps} = useLayout()
    useEffect(()=>{
        setLayoutProps({
            title: "Bảng điều khiển",
            description: "Chào mừng bạn đến với trang quản trị",
            hasButton: false,
        })
    },[])
    //================ Dùng để navigate ========================
    const navigate = useNavigate()

    //Object cho nhân sự sẽ truyền vào DisplayCard
    const members = {
        title: "Nhân sự",
        cards: 
        [
            {
                title: "Manager",
                description: "Tổng số manager", 
                quanlity: quantityAdmin?.manager_count ?? 0,
                icon: <UserIcon/>,
                handleClick: ()=>{ navigate("/quan-ly-manager") }
            },
            {
                title: "Đội ngũ liên lạc",
                description: "Nhân viên liên lạc", 
                quanlity: quantityContact?.agent_count ?? 0,
                icon: <PhoneIcon/> ,
                handleClick: ()=>{ navigate("/doi-ngu-lien-lac") }

            }
        ]
    }
    //Object cho nội dung sẽ truyền DisplayCard
    const contents = {
        title: "Nội dung",
        cards: 
        [
            {
                title: "Sản phẩm",
                description: "Tổng số sản phẩm", 
                quanlity: quantityProduct?.product_count ?? 0,
                quanCategory: `${quantityProduct?.categories_count ?? 0} loại`,
                icon: <BoxIcon/>,
                handleClick: ()=>{navigate("/quan-ly-san-pham")}
            },
            {
                title: "Dự án",
                description: "Tổng số dự án", 
                quanlity: quantityProject?.project_count ?? 0,
                quanCategory: `${quantityProject?.regions_count ?? 0} khu vực`,
                icon: <ProjectIcon/> ,
                handleClick: ()=>{navigate("/quan-ly-du-an")}
            },
            {
                title: "Tin tức",
                description: "Tổng số tin tức", 
                quanlity: quantityNews?.news_count ?? 0,
                quanCategory: `${quantityNews?.categories_count ?? 0} loại`,
                icon: <NewsIcon/> ,
                handleClick: ()=>{navigate("/quan-ly-tin-tuc")}
            }
        ]
    }
    if(isLoadingQuantityProject || isLoadingQuantityProduct || isLoadingQuantityNews || isLoadingQuantityAdmin || isLoadingQuantityContact || isLoadingActivity){
        return(<Loading/>)
    }
    return(
        <div className='p-[12px]'>
            <DisplayCards data={members}/>
            <DisplayCards data={contents}/>
            <div className='bg-white my-[24px] p-[24px] border border-white rounded-[8px]'>
                <div className='flex flex-row gap-[4px]  items-center mb-[24px] px-[12px]'>
                    <PulseIcon/>
                    <h1 className='text-[24px] font-semibold text-black  px-[12px]'> Hoạt động gần đây </h1>
                </div>
                <div className='gap-[4px]'>
                    {
                        activityLogs.map((activity, index)=>{
                            return(
                                <div key={index}>
                                    <ItemActivity data={activity}/>
                                </div>
                            )})
                    }
                </div>
            </div>
        </div>
    )
}

export default ControlPanel