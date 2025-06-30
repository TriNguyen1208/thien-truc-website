export default function CenterCard({data, width = "100%", height = "100%"}) {
    const { icon: IconComponent = null, title, description } = data;
   
    return (
        <div 
            className="bg-green-50 rounded-lg p-6 max-w-sm mx-auto shadow-sm"
            style={{width, height}}
        >
            {/* Icon */}
            <div className="mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    {IconComponent ? <IconComponent
                        style={{
                        width: '1rem',
                        height: '1rem',
                        color: '#15803D',
                        display: 'block'
                        }}
                    />: ""}
                    
                </div>
            </div>


            {/* Title */}
            <h3 className="text-lg font-semibold text-center mb-3 break-words text-(--dark-green)">
                {title || "Chất Lượng"}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed break-words text-center">
                {description || "Chúng tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao, đáp ứng và vượt trên mong đợi của khách hàng."}
            </p>
        </div>
    );
}