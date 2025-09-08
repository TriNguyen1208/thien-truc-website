import parse, { domToReact } from 'html-react-parser';
import LazyLoad from '@/components/LazyLoad';

const replaceFn = (domNode) => {
  const placeholder = (
    <span className="bg-gray-200 inline-block w-full h-full rounded-[20px]" />
  );

  // Hàm check đệ quy xem trong children có block-level hoặc img không
  const hasBlockOrImg = (children) => {
    return children?.some((child) => {
      if (child.type === 'tag') {
        if (
          ['div','p','ul','ol','h1','h2','h3','h4','h5','h6','table','img']
            .includes(child.name)
        ) {
          return true;
        }
        // check sâu hơn
        if (child.children && hasBlockOrImg(child.children)) return true;
      }
      return false;
    });
  };

  // Nếu là <p> chứa block-level hoặc <img> ở bất kỳ cấp nào => đổi thành <div>
  if (domNode.type === 'tag' && domNode.name === 'p' && domNode.children) {
    if (hasBlockOrImg(domNode.children)) {
      return (
        <div>
          {domToReact(domNode.children, { replace: replaceFn })}
        </div>
      );
    }
  }

  // LazyLoad cho <img>
  if (domNode.type === 'tag' && domNode.name === 'img') {
    const { src, alt, width, height } = domNode.attribs;
    return (
      <LazyLoad
        height={200}
        offset={100}
        throttle={100}
        once
        placeholder={placeholder}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </LazyLoad>
    );
  }
};

const renderWithLazyLoad = (html) => {
  return parse(html, { replace: replaceFn });
};

export default renderWithLazyLoad;
