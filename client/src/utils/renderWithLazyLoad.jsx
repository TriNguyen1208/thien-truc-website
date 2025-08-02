import parse from 'html-react-parser'
import LazyLoad from 'react-lazyload'

const renderWithLazyLoad = (html) =>{
    return parse(html, {
        replace: (domNode) => {
            if(domNode.name == 'img'){
                const {src, alt, width, height} = domNode.attribs;
                return (
                    <LazyLoad
                        height={200}
                        offset={100}
                        throttle={100}
                        once
                        placeholder={
                            <div className="bg-gray-200 w-full h-full rounded-[20px]" />
                        }
                    >
                        <img
                            src={src}
                            alt={alt}
                            width={width}
                            height={height}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </LazyLoad>
                )
            }
        }
    })
}
export default renderWithLazyLoad;