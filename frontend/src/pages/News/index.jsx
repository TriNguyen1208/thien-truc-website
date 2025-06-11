import useNews from "@/redux/hooks/useNews"
export default function News(){
    const {getAll} = useNews(null); //truyen null hoac id cua news
    const {data} = getAll;
    console.log(data);
    return (
        <>
            <p>Đây là nội dung trang tin tức.</p>
        </>
    )
}