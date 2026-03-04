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

interface FeaturesProps {
  featuredPost: BlogPost
}

const FeaturedPost: React.FC<FeaturesProps> = ({ featuredPost }) => {
  return (
    <div className="mb-8 bg-[#050505] border border-zinc-800 relative group overflow-hidden transition-all hover:border-[#00f0ff]/50 font-mono">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      <div className="relative h-96 overflow-hidden">
        <img
          src={featuredPost.image}
          alt={featuredPost.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />

        {/* Overlay grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
        </div>

        <div className="absolute top-4 left-4 z-20">
          <span className="bg-[#e4ff00]/10 text-[#e4ff00] border border-[#e4ff00]/30 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            {featuredPost.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="flex items-center gap-6 text-zinc-500 text-[10px] tracking-widest uppercase font-bold mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[#00f0ff]">[DATE]</span>
              <span>{featuredPost.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00f0ff]">[USER]</span>
              <span>{featuredPost.author}</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#00f0ff] transition-colors leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            {featuredPost.title}
          </h2>
          <p className="text-zinc-400 mb-6 line-clamp-2 text-sm max-w-3xl">
            {featuredPost.excerpt}
          </p>
          <button className="text-[#00f0ff] hover:text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 group/btn">
            [LEER_REGISTRO]
            <BiChevronRight
              size={16}
              className="group-hover/btn:translate-x-2 transition-transform opacity-0 group-hover/btn:opacity-100"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
