import React from "react";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import FeaturedPost from "../../components/FeaturedPost";
import RegularPost from "../../components/RegularPost";
import SearchPost from "../../components/SearchPost";
import BlogCategories from "../../components/BlogCategories";
import PopularTags from "../../components/PopularTags";
import Subscribe from "../../components/Subscribe";

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
  const popularTags = [
    "Running",
    "Sneakers",
    "Electronics",
    "Tech",
    "Summer",
    "Fitness",
  ];

  const categories: Category[] = [
    { name: "Footwear Trends", count: 42 },
    { name: "Technology", count: 38 },
    { name: "Fitness Tips", count: 25 },
    { name: "Accessories", count: 19 },
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

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen background-light dark:background-light">
      {/* Breadcrumb */}
      <BreadCrumbs />

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-4 pb-8 mx-auto">
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
            <SearchPost />

            {/* Categories */}
            <BlogCategories categories={categories} />

            {/* Popular Tags */}
            <PopularTags popularTags={popularTags} />

            {/* Subscribe */}
            <Subscribe />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Post */}
            {featuredPost && (
              <FeaturedPost featuredPost={featuredPost} />
            )}

            {/* Regular Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {regularPosts.map((post) => (
                <RegularPost post={post} />
              ))}
            </div>

            {/* Pagination */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNewsPage;