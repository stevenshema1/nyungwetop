import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-mist">
      <div className="container-x py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-5">
          <img src={logo} alt="Nyungwe Top View Hill Hotel" className="h-14 w-auto bg-white/95 p-2 rounded-sm" />
          <p className="font-serif text-2xl leading-snug max-w-md text-white/95">
            A quiet hilltop sanctuary at the edge of one of Africa's oldest rainforests.
          </p>
          <div className="flex items-center gap-4 text-white/70">
            <a href="#" aria-label="Instagram" className="hover:text-white transition"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-white transition"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition"><Twitter size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="eyebrow !text-white/50 mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link to="/tours" className="hover:text-white">Tour Packages</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-white">Our Philosophy</Link></li>
            <li><Link to="/booking" className="hover:text-white">Reserve a Stay</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-white/50 mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Bushekeri, Nyamasheke District, Rwanda</li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0" /> reservations@nyungwehotel.com</li>
            <li className="flex gap-2"><span className="text-white/40 shrink-0 w-4">☎</span> +250 787 109 335</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Nyungwe Top View Hill Hotel. All rights reserved.</span>
          <span>Crafted with care in Rwanda.</span>
        </div>
      </div>
    </footer>
  );
}
