import { useEffect } from 'react';

import { BiX } from 'react-icons/bi';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const MiModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {

    useEffect(() => {
        if (isOpen) {
            // opcional: bloquea scroll del body
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null; // Ahora está bien porque está después de los hooks

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            className="h-screen fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                className="bg-[#050505] border border-zinc-800 p-6 md:p-8 max-w-md w-full mx-4 relative font-mono shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                onClick={(e) => e.stopPropagation()} // evita cerrar al clickear dentro
            >
                {/* Decorative border corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00f0ff]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00f0ff]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#e4ff00]" />

                <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        {title}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-zinc-500 hover:text-[#ff0055] transition-colors p-1"
                    >
                        <BiX size={24} />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default MiModal;