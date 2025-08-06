import { Image } from "antd";
import LazyLoad from '@/components/LazyLoad'
const ProductImageCell = ({ imageUrl, productName = "Sản phẩm", preview = true }) => {
  return (
    <div className="w-[70px] h-[45px] bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center">
      {imageUrl ? (
        <LazyLoad
            height={200}
            offset={100}
            throttle={100}
            once
            placeholder={
                <div className="bg-gray-200 w-full h-full rounded-md" />
            }
            style={{width: '100%', height: '100%'}}
        >
          <Image
            width="100%"
            height="100%"
            src={imageUrl}
            alt={productName}
            style={{ objectFit: "cover" }}
            preview={preview}
          />
        </LazyLoad>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <svg
            className="w-full h-full text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ProductImageCell
