import { Link } from "react-router-dom";

export default function SEOFooter() {
  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* 1. TOP SECTION: Clean Navigation (Just the Essentials) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-sm">
          {/* COLUMN 1: The Core 4 */}
          {/* COLUMN 1: The Core 4 */}
          <div>
            <h4 className="font-black uppercase mb-6 tracking-widest text-black text-xs">
              Shop The Drop
            </h4>
            <ul className="space-y-4 font-bold text-gray-400 uppercase text-xs tracking-wider">
              {/* 1. T-Shirts */}
              <li>
                <Link
                  to="/products?category=T-Shirts"
                  className="hover:text-black transition-colors"
                >
                  Heavyweight Tees
                </Link>
              </li>

              {/* 2. Jackets */}
              <li>
                <Link
                  to="/products?category=Jackets"
                  className="hover:text-black transition-colors"
                >
                  Statement Jackets
                </Link>
              </li>

              {/* 3. Pants (Changed from Trousers to match your DB) */}
              <li>
                <Link
                  to="/products?category=Pants"
                  className="hover:text-black transition-colors"
                >
                  Utility Pants
                </Link>
              </li>

              {/* 4. Sweater (Singular, matches your DB) */}
              <li>
                <Link
                  to="/products?category=Sweater"
                  className="hover:text-black transition-colors"
                >
                  Knitted Sweaters
                </Link>
              </li>
            </ul>
          </div>
          {/* COLUMN 2: Company */}
          <div>
            <h4 className="font-black uppercase mb-6 tracking-widest text-black text-xs">
              Studio
            </h4>
            <ul className="space-y-4 font-medium text-gray-400 uppercase text-xs tracking-wider">
              <li>
                <Link
                  to="/about"
                  className="hover:text-black transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/stores"
                  className="hover:text-black transition-colors"
                >
                  Stockists
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-black transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Support */}
          <div>
            <h4 className="font-black uppercase mb-6 tracking-widest text-black text-xs">
              Help
            </h4>
            <ul className="space-y-4 font-medium text-gray-400 uppercase text-xs tracking-wider">
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-black transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-black transition-colors"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-black transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Newsletter */}
          <div>
            <h4 className="font-black uppercase mb-6 tracking-widest text-black text-xs">
              Unlock Access
            </h4>
            <p className="text-gray-500 mb-6 text-xs leading-relaxed">
              Be the first to know about limited drops and archive sales.
            </p>
            <div className="flex border-b-2 border-black pb-2">
              <input
                type="email"
                placeholder="ENTER EMAIL"
                className="w-full outline-none text-xs uppercase font-bold tracking-widest placeholder:text-gray-300"
              />
              <button className="text-xs font-black uppercase hover:text-gray-600">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* 2. THE "SELL": High-Impact Brand Story (SEO Rich) */}
        <div className="border-t border-gray-100 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: The Vision */}
          <div>
            <h3 className="text-2xl font-black text-black uppercase mb-6 leading-none">
              Redefining Modern
              <br />
              Street Culture.
            </h3>
            <p className="text-gray-500 text-sm leading-7 mb-6">
              At <strong>KOVA STUDIOS</strong>, we don't just make clothes; we
              engineer a lifestyle. Born from the intersection of high-street
              aesthetics and functional utility, KOVA is for those who demand
              more from their wardrobe.
            </p>
            <p className="text-gray-500 text-sm leading-7">
              We adhere to a strict philosophy of "Quality Over Hype." Every{" "}
              <strong>Drop</strong> is limited, ensuring that when you wear
              KOVA, you aren't just wearing a brand—you represent a movement.
            </p>
          </div>

          {/* Right: The Categories (SEO Keywords) */}
          <div className="text-xs text-gray-400 space-y-6 leading-relaxed">
            <div>
              <strong className="text-black block mb-1 uppercase tracking-wide">
                The Essential Fit
              </strong>
              <p>
                From our signature <strong>Oversized Tees</strong> crafted from
                280 GSM cotton to our precision-cut{" "}
                <strong>Utility Pants</strong>, every piece is designed to stand
                the test of time. We bridge the gap between lounge comfort and
                runway structure.
              </p>
            </div>
            <div>
              <strong className="text-black block mb-1 uppercase tracking-wide">
                Outerwear Authority
              </strong>
              <p>
                When the temperature drops, our{" "}
                <strong>Statement Jackets</strong> rise. Engineered for warmth
                without the bulk, our puffers and bombers are the ultimate layer
                for the modern urban explorer. Paired with our distressed{" "}
                <strong>Knitted Sweaters</strong>, your winter rotation is
                complete.
              </p>
            </div>
            <div>
              <strong className="text-black block mb-1 uppercase tracking-wide">
                The Digital Flagship
              </strong>
              <p>
                Experience seamless shopping with KOVA Online. Whether you are
                hunting for the perfect <strong>Cargo Pant</strong> or a graphic{" "}
                <strong>Heavyweight T-Shirt</strong>, our digital store brings
                the showroom experience to your device.
              </p>
            </div>
          </div>
        </div>

        {/* 3. COPYRIGHT */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          <span>© 2026 KOVA STUDIOS. All Rights Reserved.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
