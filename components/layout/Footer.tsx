import Link from "next/link";
import { Flower2, Github, Twitter, Instagram, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-md"
                style={{ background: "var(--gradient-accent)" }}
              >
                <Flower2 className="w-4 h-4 text-white" />
              </div>
              <span
                className="font-bold text-xl gradient-text"
                style={{ fontFamily: "var(--font-display)" }}
              >
                BabyBloom
              </span>
            </div>
            <p className="text-[#8C5A6E] text-sm leading-relaxed max-w-xs">
              Modern healthcare management for every growing family. Track, monitor, and celebrate every milestone.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#8C5A6E] hover:text-rose-500 hover:bg-pink-100 hover:border-pink-200 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[#1A0A0D] text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              {["Features", "AI Predictor", "Dashboard", "Vaccinations"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[#8C5A6E] hover:text-rose-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1A0A0D] text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Contact Us", "Support"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-[#8C5A6E] hover:text-rose-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8C5A6E] text-sm">
            © {new Date().getFullYear()} BabyBloom. All rights reserved.
          </p>
          <p className="text-[#8C5A6E] text-sm flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
