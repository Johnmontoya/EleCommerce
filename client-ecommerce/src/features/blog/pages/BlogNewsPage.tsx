import React, { useState } from "react";
import { BiCalendar, BiChevronLeft, BiChevronRight, BiSearch, BiUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

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

interface Category {
  name: string;
  count: number;
}

const BlogNewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories: Category[] = [
    { name: "Footwear Trends", count: 42 },
    { name: "Technology", count: 38 },
    { name: "Fitness Tips", count: 25 },
    { name: "Accessories", count: 19 },
  ];

  const popularTags = [
    "Running",
    "Sneakers",
    "Electronics",
    "Tech",
    "Summer",
    "Fitness",
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Ultimate Guide to Choosing the Perfect Running Shoe",
      excerpt:
        "Choosing the right running shoe can be a daunting task with so many options available. Whether you're a beginner or a seasoned marathon runner, understanding your foot type and running style is crucial. In this guide...",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
      category: "FEATURED",
      author: "Ryan",
      date: "Oct 24, 2023",
      featured: true,
    },
    {
      id: 2,
      title: "Top 10 Tech Gadgets for Productivity in 2024",
      excerpt:
        "Boost your workflow with these cutting-edge devices that combine innovation and efficiency to supercharge your focus.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
      category: "TECHNOLOGY",
      author: "Mysterious",
      date: "Sep 18, 2023",
    },
    {
      id: 3,
      title: "Summer Sneaker Trends You Can't Miss",
      excerpt:
        "From chunky soles to bold colors, here's what's making waves in the sneaker world this season and beyond.",
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop",
      category: "FASHION",
      author: "Mysterious",
      date: "Sep 18, 2023",
    },
    {
      id: 4,
      title: "Home Workout Essentials",
      excerpt:
        "Building a home gym doesn't have to be expensive. We cover the must-have equipment to keep you fit without breaking the bank.",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      category: "FITNESS",
      author: "Alex",
      date: "Aug 12, 2023",
    },
    {
      id: 5,
      title: "How to Extend the Life of Your Electronics",
      excerpt:
        "Simple maintenance tips that add years to your favorite devices. From proper charging to dust management, a little care goes a long way.",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
      category: "TIPS & TRICKS",
      author: "Alex",
      date: "Jul 05, 2023",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto flex justify-start items-center px-4 py-4">
        <p className="text-slate-300 font-light text-sm">
          <span className="hover:text-cyan-400 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-cyan-400 font-medium cursor-pointer">
            Blog
          </span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-6 my-8 mx-auto">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex flex-col gap-1 items-start justify-start mb-8">
            <h1 className="text-4xl font-bold text-slate-100">
              Ultimas Noticias y Actualizaciones
            </h1>
            <p className="text-slate-400 max-w-2xl">
            La ultima tendencia en tecnologia, fitness y ofertas exclusivas en nuestra tienda.
          </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pb-8">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-6">
            {/* Search */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Search</h3>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pr-12 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <BiSearch size={20} />
                </button>
              </form>
            </div>

            {/* Categories */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className="flex items-center justify-between text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {category.name}
                    </span>
                    <span className="bg-slate-700 group-hover:bg-cyan-500/20 text-slate-400 group-hover:text-cyan-400 px-2 py-1 rounded-full text-xs font-semibold transition-all">
                      {category.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tags */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    className="bg-slate-700/50 hover:bg-cyan-500/20 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscribe */}
            <div className="bg-linear-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Subscribe Now
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest updates delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <MdEmail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-100 font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Post */}
            {featuredPost && (
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
                        <span>By {featuredPost.author}</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-300 mb-4 line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <button className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 group/btn">
                      Read More
                      <BiChevronRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {regularPosts.map((post) => (
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
                        <span>By {post.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center gap-2 group/btn">
                      Read Article
                      <BiChevronRight
                        size={14}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BiChevronLeft size={20} />
              </button>

              {[1, 2, 3, "...", 5].map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? "bg-cyan-500 text-white"
                      : page === "..."
                      ? "text-slate-500 cursor-default"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all"
              >
                <BiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNewsPage;