import { ProductOutlined } from "@ant-design/icons";
import { useParams, useNavigation } from "react-router-dom";
import LazyLoad from "@/components/LazyLoad";
import useProducts from "@/hooks/useProducts";
import ComingSoon from "@/pages/ComingSoon";
import Loading from "@/components/Loading";
import BackButton from "@/components/BackButton";
import TagDiscount from "../../components/TagDiscount";
function Picture({ url }) {
  return (
    <div className="flex flex-col">
      <div className="w-full p-[15px] border border-[#E5E7EB] rounded-[8px]">
        <LazyLoad
          height={200}
          offset={100}
          throttle={100}
          once
          placeholder={
            <div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>
          }
          style={{ width: "100%", height: "100%" }}
        >
          <img
            src={url}
            alt="product"
            className="w-full h-full object-cover rounded-t-[6px]"
          />
        </LazyLoad>
      </div>
    </div>
  );
}

function Features({ features = [] }) {
  return (
    <div className="p-[20px] border border-[#E5E7EB] rounded-[8px]">
      <div className="border-l-[5px] border-[#14532D] px-[20px] my-[20px]">
        <span className="text-[#14532D] text-[20px] font-bold">
          Tính năng nổi bật
        </span>
      </div>
      <ul>
        {features.map((hl, index) => (
          <li
            key={index}
            className={`flex flex-row h-[40px] items-center p-[10px] my-[5px] ${
              index % 2 === 0 ? "bg-[#F9FAFB]" : ""
            }`}
          >
            {hl}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Specifications({ specs = {} }) {
  return (
    <div className="p-[20px] border border-[#E5E7EB] rounded-[8px]">
      <div className="border-l-[5px] border-[#14532D] px-[20px] my-[20px]">
        <span className="text-[#14532D] text-[20px] font-bold">
          Thông số kỹ thuật
        </span>
      </div>
      <div className="overflow-hidden">
        <ul>
          {Object.entries(specs).map(([key, value], index) => (
            <li
              key={index}
              className={`flex flex-row h-[40px] items-center p-[10px] my-[5px] ${
                index % 2 === 0 ? "bg-[#F9FAFB]" : ""
              }`}
            >
              <div className="w-[33%]">{key}</div>
              <div className="w-[67%]">{value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ProductDetail() {
    const { id } = useParams();
    const navigation = useNavigation();

    const {data: product, isLoading: isLoadingProduct} = useProducts.products.getOne(id);

    if (!id) {
        return <div>Không có sản phẩm</div>;
    }

    if (isLoadingProduct) {
        return <Loading />;
    }

    if (!product) {
        return <div>Không tìm thấy sản phẩm</div>;
    }

    return (
    <>
        {navigation.state === "loading" && <Loading />}
        {product.is_visible ? (
        <div className="container-fluid py-[30px]">
            <BackButton content="Quay lại danh sách sản phẩm" />
            <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
            {/* Ảnh sản phẩm */}
            <div className="relative">
                {product.product_img ? (
                <Picture url={product.product_img} />
                ) : (
                <div className="w-full aspect-square flex items-center justify-center border border-gray-300">
                    <ProductOutlined style={{ fontSize: "48px", color: "#9CA3AF" }} />
                </div>
                )}
                <div className="absolute top-0 right-0">
                    <TagDiscount percent={product.discount_percent}/>
                </div>
            </div>

            {/* Thông tin cơ bản */}
            <div className="flex flex-col">
                <h1 className="pb-[10px] font-bold text-[20px] sm:text-[24px] leading-none">
                {product.name}
                </h1>
                  <div className="flex flex-row gap-3 border-y border-[#E5E7EB] py-[15px] my-[15px] text-[23px]">
                      <span className="text-[#ff0000] font-semibold">{product.is_sale === true ? <span className="">{product.final_price.toLocaleString("vi-VN") + " ₫"}</span>: typeof product.price === "number" ? <span>{product.price.toLocaleString("vi-VN") + " ₫"}</span> : "Chưa có giá"}</span>
                      {product.is_sale == true ? <span className="line-through text-[#9e9e9e] ">{product.price.toLocaleString("vi-VN") + " ₫"}</span> : <></>}
                  </div>
                <p className="py-[10px] text-[16px] whitespace-pre-wrap">
                {product.description}
                </p>
            </div>

            {/* Tính năng */}
            <Features features={product.product_features || []} />

            {/* Thông số kỹ thuật */}
            <Specifications specs={product.product_specifications || {}} />
            </div>
        </div>
        ) : (
        <ComingSoon />
        )}
    </>
    );
}
