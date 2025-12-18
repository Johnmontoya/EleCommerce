// components/detailsProduct/ReviewsContent.tsx

import React from 'react';
import { FaStar } from 'react-icons/fa';
import type { Product } from '../../types/product.types';

interface ReviewsContentProps {
    product: Product;
}

const ReviewsContent: React.FC<ReviewsContentProps> = ({ product }) => {
    
    const rating = product.rating || 0;
    const reviewsCount = product.reviewsCount || 0;

    return (
        <div className="space-y-6 text-slate-300">
            <div className="flex items-center gap-4 border-b border-slate-700 pb-4">
                <div className="text-5xl font-extrabold text-cyan-400">{rating.toFixed(1)}</div>
                <div>
                    <div className="flex text-amber-400">
                        {Array(5).fill("").map((_, i) => (
                            <FaStar key={i} className={rating > i ? "fill-amber-400" : "fill-slate-500"} />
                        ))}
                    </div>
                    <p className="text-sm text-slate-400">{reviewsCount} opiniones verificadas</p>
                </div>
            </div>
            
            <p className="italic text-slate-400">
                Aquí iría una lista de los comentarios reales de los clientes...
            </p>
            {/* Aquí iría la lógica para listar las reviews individuales */}
        </div>
    );
};

export default ReviewsContent;