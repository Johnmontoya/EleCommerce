// components/detailsProduct/SpecsContent.tsx

import React from 'react';
import type { Product } from '../../types/product.types';
import { FaPalette } from 'react-icons/fa';

interface SpecsContentProps {
    product: Product;
}

const SpecsContent: React.FC<SpecsContentProps> = ({ product }) => {
    
    // Si tienes atributos, puedes listarlos aquí:
    const attributes = product.attributes || []; 
    
    return (
        <div className="space-y-6 text-slate-300">
            <h3 className="text-xl font-semibold text-cyan-400 border-b border-slate-700 pb-2">Opciones y Variantes</h3>
            <ul className="space-y-3">
                {product.variants?.map((variant, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <FaPalette className="text-xl text-yellow-500" />
                        <span className="font-bold text-slate-100">{variant.name}:</span>
                        <span>{variant.options.join(", ")}</span>
                    </li>
                ))}
            </ul>
            
            {attributes.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold text-cyan-400 border-b border-slate-700 pb-2">Atributos Clave</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {attributes.map((attr, index) => (
                            <div key={index} className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
                                <span className="font-medium">{attr.name}</span>
                                <span className="text-cyan-300">{attr.value}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SpecsContent;