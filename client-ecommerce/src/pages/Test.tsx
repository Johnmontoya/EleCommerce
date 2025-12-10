import { useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiHeart, BiPackage, BiSearch, BiShield } from 'react-icons/bi';
import { CiHeadphones, CiShoppingCart } from 'react-icons/ci';

export default function Test() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: 'Tablet', icon: '📱', color: 'bg-blue-100' },
    { name: 'Smartphone', icon: '📱', color: 'bg-purple-100' },
    { name: 'Game Console', icon: '🎮', color: 'bg-orange-100' },
    { name: 'Camera', icon: '📷', color: 'bg-gray-100' },
    { name: 'Smartwatch', icon: '⌚', color: 'bg-yellow-100' },
    { name: 'Drone', icon: '🚁', color: 'bg-green-100' },
    { name: 'Audio', icon: '🎧', color: 'bg-pink-100' },
    { name: 'Computer', icon: '💻', color: 'bg-indigo-100' },
  ];

  const products = [
    { name: 'MACBOOK PRO 16', desc: '3K Retina Touch Display', image: '💻', color: 'bg-blue-50' },
    { name: 'SMART SPEAKER', desc: 'Dual-Speaker True sound', image: '🔊', color: 'bg-pink-50' },
    { name: 'BAMBOO SPEAKER', desc: 'Sound that Speaks for Itself', image: '🔉', color: 'bg-cyan-50' },
  ];

  const smartphones = [
    { name: 'Phone X1', color: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { name: 'Phone X2', color: 'bg-gradient-to-br from-green-300 to-green-600' },
    { name: 'Phone X3', color: 'bg-gradient-to-br from-teal-400 to-blue-500' },
    { name: 'Phone X4', color: 'bg-gradient-to-br from-gray-400 to-gray-700' },
    { name: 'Phone X5', color: 'bg-gradient-to-br from-purple-400 to-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">eCommax</h1>
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                />
                <BiSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="relative">
                <BiHeart className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="relative">
                <CiShoppingCart className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex space-x-8 text-sm">
              <li className="py-4 border-b-2 border-blue-600 text-blue-600 font-medium cursor-pointer">HOME</li>
              <li className="py-4 text-gray-600 hover:text-blue-600 cursor-pointer">COLLECTIONS</li>
              <li className="py-4 text-gray-600 hover:text-blue-600 cursor-pointer">PRODUCTS</li>
              <li className="py-4 text-gray-600 hover:text-blue-600 cursor-pointer">OTHER PAGES</li>
              <li className="py-4 text-gray-600 hover:text-blue-600 cursor-pointer">BLOG PAGES</li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Banner */}
        <div className="lg:col-span-2 bg-linear-to-r from-blue-900 to-blue-700 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm font-medium mb-2">GAMING GEAR</p>
            <h2 className="text-5xl font-bold mb-4">GAME CONTROLLER</h2>
            <p className="text-blue-200 mb-6">Controller Light Wireless controller</p>
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              SHOP NOW
            </button>
          </div>
          <div className="absolute right-0 bottom-0 w-96 h-96">
            <div className="text-9xl">🎮</div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-blue-400'}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>

        {/* Side Banners */}
        <div className="flex flex-col gap-6">
          <div className="bg-linear-to-r from-purple-600 to-purple-800 rounded-3xl p-8 text-white relative h-full">
            <p className="text-sm font-medium mb-2">NEW ARRIVALS</p>
            <h3 className="text-2xl font-bold mb-4">BAMBOOKUDS</h3>
            <button className="text-white text-sm font-medium flex items-center">
              Shop Now →
            </button>
            <div className="absolute right-4 top-4 text-6xl">🎧</div>
          </div>
          
          <div className="bg-linear-to-r from-pink-900 to-purple-900 rounded-3xl p-8 text-white relative h-full">
            <p className="text-sm font-medium mb-2 text-green-400">NEW ARRIVALS</p>
            <h3 className="text-2xl font-bold mb-4">HOMEPOD PRO</h3>
            <button className="text-white text-sm font-medium flex items-center">
              Shop Now →
            </button>
            <div className="absolute right-4 bottom-4 text-6xl">🔊</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          <button className="p-2 rounded-full bg-white shadow-md">
            <BiChevronLeft className="w-5 h-5" />
          </button>
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[120px]">
              <div className={`w-24 h-24 ${cat.color} rounded-full flex items-center justify-center text-4xl mb-3 hover:scale-110 transition cursor-pointer`}>
                {cat.icon}
              </div>
              <p className="text-sm font-medium text-gray-700">{cat.name}</p>
            </div>
          ))}
          <button className="p-2 rounded-full bg-white shadow-md">
            <BiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BiPackage className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">FREE US DELIVERY</h4>
            <p className="text-sm text-gray-600">For US customers (shipping and Hawaii) or orders over 2500</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BiShield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">SECURE PAYMENT</h4>
            <p className="text-sm text-gray-600">We accept Visa, American Express, Paypal, Payment Mastercard and Discover</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BiShield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">1 YEAR WARRANTY</h4>
            <p className="text-sm text-gray-600">All of our products are made with care and covered for one year against manufacturing defects</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CiHeadphones className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">SUPPORT 24/7</h4>
            <p className="text-sm text-gray-600">Contact us 24 hours a day, 7 days a week. Call Us: 0123-456-789</p>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className={`${product.color} rounded-3xl p-8 text-center`}>
              <div className="text-8xl mb-4">{product.image}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Smartphone Trends */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">TOP SMARTPHONE TRENDS</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {smartphones.map((phone, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
              <div className={`${phone.color} h-64 rounded-xl mb-4 flex items-center justify-center text-6xl`}>
                📱
              </div>
              <p className="text-xs text-gray-500 mb-1">SMARTPHONE</p>
              <h4 className="font-bold text-gray-800 mb-2">{phone.name}</h4>
              <div className="flex items-center text-yellow-400 text-sm mb-2">
                ★★★★★
              </div>
              <p className="text-lg font-bold text-blue-600">$299</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 eCommax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}