import { useEffect, useRef } from 'react';
import LazyLoad, { forceCheck } from 'react-lazyload';

function LazyLoadImage({ children, ...props }) {
  const ref = useRef();

  useEffect(() => {
    const scrollElements = [
        ...document.querySelectorAll('.scroll-wrapper'),
        ...document.querySelectorAll('.scroll-table')
    ];

    const handleScroll = () => {
        forceCheck();
    };

    scrollElements.forEach(el => {
        el.addEventListener('scroll', handleScroll);
    });

    return () => {
        scrollElements.forEach(el => {
            el.removeEventListener('scroll', handleScroll);
        });
    };
  }, []);

  return (
    <LazyLoad {...props}>
        <div ref={ref} className='w-full h-full'>{children}</div>
    </LazyLoad>
  );
}

export default LazyLoadImage;
