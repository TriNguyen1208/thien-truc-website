import LazyLoad from "@/components/LazyLoad";
const ImgComponent = ({ src }) => (
    <LazyLoad
        height={200}
        offset={100}
        throttle={100}
        once
        placeholder={<div className="bg-gray-200 w-full h-full rounded-[20px]" />}
        style={{ width: '100%', height: '100%' }}
    >
        <img src={src} alt="" className="w-full h-full object-cover rounded-md" />
    </LazyLoad>
);

export default function Culture({data}) {
    return (
        <div className="grid grid-cols-12 py-10 px-10 lg:gap-10 bg-[#F9FAFB] ">
            <div className="col-span-12 lg:col-span-6 gap-5">
                <h2 className="text-(--dark-green) text-3xl font-bold">Văn hóa của chúng tôi</h2>
                <div className="text-[#166534] text-[16px] text-justify">
                    {data.culture_content}
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6 mt-[30px]">
                <div className="grid grid-cols-2 gap-10  ">
                    <ImgComponent src={data.culture_img_1} />
                    <ImgComponent src={data.culture_img_2} />
                    <ImgComponent src={data.culture_img_3} />
                    <ImgComponent src={data.culture_img_4} />
                </div>
            </div>
        </div>
    );
}

