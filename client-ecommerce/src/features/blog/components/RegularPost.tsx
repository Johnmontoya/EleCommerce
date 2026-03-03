import React from "react";
import { BiChevronRight } from "react-icons/bi";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  featured?: boolean;
}

interface RegularProps {
  post: BlogPost
}

const RegularPost: React.FC<RegularProps> = ({ post }) => {
  return (
    <div
      key={post.id}
      className="bg-[#050505] border border-zinc-800 relative group overflow-hidden transition-all hover:border-[#00f0ff]/50 font-mono flex flex-col"
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />
        {/* Overlay grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
        </div>
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-black/80 border border-zinc-800 text-[#00f0ff] px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-zinc-500 text-[10px] tracking-widest uppercase font-bold mb-3">
          <div className="flex items-center gap-1">
            <span className="text-[#00f0ff]">[DATE]</span>
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#00f0ff]">[USER]</span>
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors line-clamp-2 leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          {post.title}
        </h3>
        <p className="text-zinc-400 text-xs mb-6 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <button className="text-[#00f0ff] hover:text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 group/btn mt-auto">
          [READ_RECORD]
          <BiChevronRight
            size={14}
            className="group-hover/btn:translate-x-2 transition-transform opacity-0 group-hover/btn:opacity-100"
          />
        </button>
      </div>
    </div>
  );
};

export default RegularPost;
