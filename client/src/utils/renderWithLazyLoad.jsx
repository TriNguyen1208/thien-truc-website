import parse from 'html-react-parser';
import LazyLoad from 'react-lazyload';

const renderWithLazyLoad = (html) => {
    return parse(html, {
        replace: (domNode) => {
            // Placeholder chung cho LazyLoad
            const placeholder = <span className="bg-gray-200 inline-block w-full h-full rounded-[20px]" />;

            // Xử lý các lỗi DOM lồng ghép không hợp lệ
            if (domNode.type === 'tag' && domNode.name === 'p' && domNode.children) {
                // Kiểm tra xem có bất kỳ con nào là block-level element không
                const hasBlockChild = domNode.children.some(child => 
                    child.type === 'tag' && ['div', 'p', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table'].includes(child.name)
                );
                
                if (hasBlockChild) {
                    // Nếu có, thay thế toàn bộ thẻ <p> bằng một thẻ <div>
                    return <div>{parse(domNode.children, { replace: renderWithLazyLoad.bind(this) })}</div>;
                }
            }

            // Xử lý LazyLoad cho tất cả các thẻ <img>
            if (domNode.type === 'tag' && domNode.name === 'img') {
                const { src, alt, width, height } = domNode.attribs;
                return (
                    <LazyLoad height={200} offset={100} throttle={100} once placeholder={placeholder}>
                        <img src={src} alt={alt} width={width} height={height} style={{ maxWidth: '100%', height: 'auto' }} />
                    </LazyLoad>
                );
            }
        },
    });
};

export default renderWithLazyLoad;