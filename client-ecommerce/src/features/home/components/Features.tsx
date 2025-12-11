import { Assets } from "../../../assets/assets";

const Features = () => {
  return (
    <div className="bg-slate-800 py-1">
      <section className="max-w-7xl mx-auto px-4 my-10">
      <div className="absolute top-210 left-1/2 w-32 h-32 bg-blue-500/30 rounded-full filter blur-3xl animate-float1"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="w-44 h-44 flex items-center justify-center mx-auto mb-4">
            <img src={Assets.Features1} className="w-44" />
          </div>
          <h4 className="font-bold text-gray-600 mb-2">FREE US DELIVERY</h4>
          <p className="text-sm text-gray-500">
            For US customers (shipping and Hawaii) or orders over 2500
          </p>
        </div>
        <div className="text-center">
          <div className="w-44 h-44 flex items-center justify-center mx-auto mb-4">
            <img src={Assets.Features2} className="w-44" />
          </div>
          <h4 className="font-bold text-gray-600 mb-2">SECURE PAYMENT</h4>
          <p className="text-sm text-gray-500">
            We accept Visa, American Express, Paypal, Payment Mastercard and
            Discover
          </p>
        </div>
        <div className="text-center">
          <div className="w-44 h-44 flex items-center justify-center mx-auto mb-4">
            <img src={Assets.Features3} className="w-44" />
          </div>
          <h4 className="font-bold text-gray-600 mb-2">1 YEAR WARRANTY</h4>
          <p className="text-sm text-gray-500">
            All of our products are made with care and covered for one year
            against manufacturing defects
          </p>
        </div>
        <div className="text-center">
          <div className="w-44 h-44 flex items-center justify-center mx-auto mb-4">
            <img src={Assets.Features4} className="w-44" />
          </div>
          <h4 className="font-bold text-gray-600 mb-2">SUPPORT 24/7</h4>
          <p className="text-sm text-gray-500">
            Contact us 24 hours a day, 7 days a week. Call Us: 0123-456-789
          </p>
        </div>
      </div>
    </section>
    </div>    
  );
};

export default Features;
