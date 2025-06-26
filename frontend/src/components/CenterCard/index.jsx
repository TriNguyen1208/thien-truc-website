export default function CenterCard(props) {
    const { icon: IconComponent, title, description } = props;
    return (
        <div className="bg-green-50 rounded-lg p-6 text-center max-w-sm mx-auto shadow-sm">
            {/* Icon */}
            <div className="mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <IconComponent
                    style={{
                      width: '1rem',
                      height: '1rem',
                      color: '#15803D',
                      display: 'block'
                    }}
/>
                </div>
            </div>


            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {title || "Chất Lượng"}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
                {description || "Chúng tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao, đáp ứng và vượt trên mong đợi của khách hàng."}
            </p>
        </div>
    );
}