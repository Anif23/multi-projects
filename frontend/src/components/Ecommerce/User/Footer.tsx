const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">YourStore</h2>
          <p className="text-sm text-gray-400">
            Premium shopping experience with top quality products.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-white mb-4 font-semibold">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>All Products</li>
            <li>Categories</li>
            <li>Offers</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white mb-4 font-semibold">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-white mb-4 font-semibold">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © 2026 YourStore. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;