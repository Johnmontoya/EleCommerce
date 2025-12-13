import React from "react";
import { BiCalendar, BiChevronRight, BiUser } from "react-icons/bi";

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
      className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-slate-900/80 backdrop-blur-sm text-cyan-400 px-3 py-1 rounded-lg text-xs font-bold uppercase">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-slate-500 text-xs mb-3">
          <div className="flex items-center gap-1">
            <BiCalendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <BiUser size={14} />
            <span>Por {post.author}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center gap-2 group/btn">
          Leer Articulo
          <BiChevronRight
            size={14}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default RegularPost;
