import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function About() {
  const { pathname } = useLocation();

  // Scroll to contact section if URL is /contact
  useEffect(() => {
    if (pathname === "/contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="w-full bg-white text-black pt-32">
      {/* 1. THE VISION */}
      <section className="px-6 md:px-40 pb-24">
        <div className="w-full">
          {/* Header */}
          <div className="mb-16 text-center md:text-left border-b border-black pb-8">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
              About <br /> KOVA
            </h1>
            <p className="text-sm font-bold tracking-[0.3em] uppercase opacity-60">
              Est. 2024 • Bengaluru
            </p>
          </div>

          <h2 className="text-3xl font-black uppercase mb-10 tracking-wide">
            The Vision
          </h2>

          <div className="space-y-10 text-xl md:text-2xl leading-relaxed text-gray-800 md:text-left font-light max-w-4xl">
            <p>
              KOVA wasn't built to fit in. It was built to stand out. Founded by{" "}
              <span className="text-black font-bold">Sujal Thapa</span>, we are
              bridging the gap between high-street luxury and everyday
              durability.
            </p>
            <p>
              We don't just sell clothes; we sell a mindset. Every stitch is a
              statement, and every design is a rebellion against the ordinary.
              We believe that style shouldn't come at the cost of substance.
            </p>

            <p>
              Our fabrics are sourced from the finest mills, tested for the grit
              of the city. Whether it's a 300 GSM oversized tee or a pair of
              cargos that can survive a mosh pit, we design for the life you
              actually live.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-12 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-black" />
                <span className="font-bold uppercase tracking-widest text-sm">
                  Sustainable Cotton
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-black" />
                <span className="font-bold uppercase tracking-widest text-sm">
                  Limited Drops
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-black" />
                <span className="font-bold uppercase tracking-widest text-sm">
                  Unisex Fits
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-black" />
                <span className="font-bold uppercase tracking-widest text-sm">
                  Global Shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT & LOCATION */}
      <section
        id="contact"
        className="min-h-screen flex items-center bg-black text-white py-24 px-6 md:px-40"
      >
        <div className="w-full grid lg:grid-cols-2 gap-24 items-center">
          {/* Contact Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl font-black uppercase mb-16 tracking-wider">
              Get in Touch
            </h2>

            <div className="space-y-12">
              {/* 👇 FIXED: "Visit Us" now links to Google Maps properly */}
              <a
                href="https://www.google.com/maps?q=Brigade+Road,Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="p-4 bg-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase mb-2">Visit Us</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Brigade Road, Shanthala Nagar,
                    <br />
                    Bengaluru, Karnataka 560001
                  </p>
                </div>
              </a>

              <a
                href="mailto:hello@kovastore.com"
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="p-4 bg-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase mb-2">Email Us</h3>
                  <p className="text-gray-400 text-lg">hello@kovastore.com</p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="p-4 bg-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase mb-2">Call Us</h3>
                  <p className="text-gray-400 text-lg">+91 98765 43210</p>
                </div>
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-8 mt-20">
              <Instagram className="w-10 h-10 hover:text-gray-400 cursor-pointer transition-colors" />
              <Twitter className="w-10 h-10 hover:text-gray-400 cursor-pointer transition-colors" />
              <Linkedin className="w-10 h-10 hover:text-gray-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* 👇 FIXED: Added a working Google Maps Embed URL for Brigade Road */}
          <div className="h-[60vh] w-full bg-gray-900 rounded-2xl overflow-hidden relative filter grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
            <iframe
              src="https://maps.google.com/maps?q=Brigade%20Road,%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 3. NEWSLETTER */}
      <section className="py-24 border-t border-gray-200 text-center px-4 bg-white">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">
          Never Miss a Drop
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          Join the club. Get exclusive access to new releases and member-only
          events.
        </p>
        <div className="flex max-w-md mx-auto border-b-2 border-black pb-2">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="w-full outline-none text-xl uppercase placeholder:text-gray-400"
          />
          <button className="font-bold uppercase hover:opacity-50 transition-opacity">
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}
