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
        <div className="space-y-6 text-zinc-300 font-mono">
            <div className="flex items-center gap-6 border-b border-zinc-800 border-dashed pb-6">
                <div className="text-5xl font-bold text-[#00f0ff] tracking-tighter">
                    {rating.toFixed(1)}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1 text-[#e4ff00]">
                        {Array(5).fill("").map((_, i) => (
                            <FaStar key={i} size={16} className={rating > i ? "text-[#e4ff00]" : "text-zinc-800"} />
                        ))}
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mt-1">
                        [{reviewsCount}] VERIFIED_LOGS
                    </p>
                </div>
            </div>

            <div className="bg-black border border-zinc-800 p-4">
                <p className="text-[10px] text-[#ff0055] font-bold tracking-[0.2em] uppercase mb-2 animate-pulse flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ff0055]"></span>
                    [SYS_WARN: FETCHING_REVIEW_DATA]
                </p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest border-l-2 border-zinc-800 pl-3">
                    USER_FEEDBACK_MODULE_OFFLINE... AWAITING_CONNECTION.
                </p>
            </div>
        </div>
    );
};

export default ReviewsContent;