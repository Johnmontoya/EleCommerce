import React from "react";
import FeaturedPost from "../../components/FeaturedPost";
import RegularPost from "../../components/RegularPost";
import SearchPost from "../../components/SearchPost";
import SEO from "../../../../shared/components/SEO";
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
    <div className="min-h-screen bg-[#020202] relative font-mono text-white pb-12">
      <SEO 
        title="Blog & Noticias" 
        description="Mantente al día con los últimos reportes del sistema, actualizaciones de hardware y noticias de EleCommerce."
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "EleCommerce System Logs",
          "description": "Reportes de tecnología, anuncios de equipos y flujos de datos.",
          "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "datePublished": post.date
          }))
        })}
      </script>
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl w-full px-4 pt-12 pb-8 mx-auto relative z-10">
        <div className="flex-1">
          <div className="flex flex-col gap-2 items-start justify-start mb-8 border-l-4 border-[#00f0ff] pl-6">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              SYS_LOGS // ACTUALIZACIONES_MÁS_RECENTES
            </h1>
            <p className="text-zinc-500 max-w-2xl font-mono text-sm tracking-widest uppercase">
              &gt; REPORTES_DE_TECNOLOGÍA | ANUNCIOS_DE_EQUIPOS | FLUJOS_DE_DATOS
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 relative z-10">

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
                <RegularPost key={post.id} post={post} />
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