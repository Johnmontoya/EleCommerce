// components/detailsProduct/SpecsContent.tsx

import React from 'react';
import type { Product } from '../../types/product.types';

interface SpecsContentProps {
    product: Product;
}

const SpecsContent: React.FC<SpecsContentProps> = ({ product }) => {

    // Si tienes atributos, puedes listarlos aquí:
    const attributes = product.attributes || [];

    return (
        <div className="space-y-8 text-zinc-300 font-mono">
            {product.variants && product.variants.length > 0 && (
                <div>
                    <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#e4ff00]"></span>
                        VARIANTES_DEL_PRODUCTO //
                    </h3>
                    <ul className="space-y-2 border-l border-zinc-800 pl-4">
                        {product.variants?.map((variant, index) => (
                            <li key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2 border-b border-zinc-900 border-dashed last:border-0">
                                <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] w-32 uppercase">[{variant.name}]</span>
                                <span className="text-white text-xs tracking-widest uppercase">{variant.options.join(" / ")}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {attributes.length > 0 && (
                <div>
                    <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 mt-8">
                        <span className="w-1.5 h-1.5 bg-[#e4ff00]"></span>
                        ATTRIBUTES_DEL_SISTEMA //
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {attributes.map((attr, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-black border border-zinc-800 hover:border-[#00f0ff] transition-colors group">
                                <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase group-hover:text-zinc-300 transition-colors">[{attr.name}]</span>
                                <span className="text-[#00f0ff] text-xs tracking-widest uppercase text-right">{attr.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpecsContent;