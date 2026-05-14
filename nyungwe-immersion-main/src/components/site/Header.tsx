import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Menu, X, Mail, Phone, MapPin } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/tours", label: "Tours" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "Philosophy" },
  { to: "/booking", label: "Booking" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top contact bar — uses Reserve button background (forest-deep) */}
      <div className="bg-forest-deep text-white/90 text-xs">
        <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 py-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href="mailto:reservations@nyungwehotel.com" className="inline-flex items-center gap-1.5 hover:text-clay transition">
              <Mail size={12} /> reservations@nyungwehotel.com
            </a>
            <a href="tel:+250787109335" className="inline-flex items-center gap-1.5 hover:text-clay transition">
              <Phone size={12} /> +250 787 109 335
            </a>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/70">
              <MapPin size={12} /> Bushekeri, Nyamasheke · Rwanda
            </span>
          </div>
          <span className="hidden md:inline text-white/60 tracking-widest uppercase text-[10px]">Open year-round · Since 2011</span>
        </div>
      </div>

      {/* Main bar — solid background, consistent across all pages */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-x flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Nyungwe Top View Hill Hotel" className="h-10 w-auto" />
            <span className="hidden sm:block font-serif text-lg leading-tight text-foreground">
              Nyungwe<br />
              <span className="text-[10px] tracking-[0.25em] uppercase opacity-70">Top View Hill</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm tracking-wide text-foreground/75 hover:text-primary transition-colors"
                activeProps={{ className: "!text-primary font-semibold" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/booking"
              className="rounded-sm bg-forest-deep px-5 py-2.5 text-sm text-white hover:bg-forest transition-colors"
            >
              Reserve
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border">
            <div className="container-x flex flex-col py-4 gap-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-foreground/80 hover:text-primary"
                  activeProps={{ className: "!text-primary font-semibold" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-sm bg-forest-deep px-5 py-3 text-sm text-white text-center"
              >
                Reserve
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
