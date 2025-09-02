// src/pages/components/ProductGrid.jsx
import { Link } from 'react-router-dom';
import ItemProduct from '@/components/ItemProduct';
import React from 'react';

export default function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        return null;
    }
    
    return (
        <div className='grid grid-cols-2 place-items-center p-2 lg:p-4 gap-2 sm:grid-cols-4'>
            {products.map((product, i) => (
                <Link key={i} className='aspect-[4/8] w-full max-w-[230px] sm:max-h-[320px] md:max-h-[420px] lg:max-w-[280px] lg:max-h-[470px] xl:max-h-[500px]' to={`/san-pham/${product.id}`}>
                    <ItemProduct product={product} />
                </Link>
            ))}
        </div>
    );
}