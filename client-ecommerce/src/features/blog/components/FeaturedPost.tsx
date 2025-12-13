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

interface FeaturesProps {
    featuredPost: BlogPost
}

const FeaturedPost: React.FC<FeaturesProps> = ({ featuredPost }) => {
  return (
    <div className="mb-8 bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all">
      <div className="relative h-96 overflow-hidden">
        <img
          src={featuredPost.image}
          alt={featuredPost.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-linear-to-r from-cyan-400 to-cyan-500 text-slate-900 px-4 py-2 rounded-lg text-xs font-bold uppercase">
            {featuredPost.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-4 text-slate-400 text-sm mb-3">
            <div className="flex items-center gap-2">
              <BiCalendar size={16} />
              <span>{featuredPost.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <BiUser size={16} />
              <span>Por {featuredPost.author}</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
            {featuredPost.title}
          </h2>
          <p className="text-slate-300 mb-4 line-clamp-2">
            {featuredPost.excerpt}
          </p>
          <button className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 group/btn">
            Leer Articulo
            <BiChevronRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
