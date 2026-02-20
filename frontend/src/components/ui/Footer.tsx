import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-foreground mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <h2 className="text-lg flex items-center font-semibold tracking-tight"><img src={logo} className="h-11 w-11" alt="PopcornList logo" /> Popcorn List</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Track movies you love, discover what to watch next,
            and build your personal cinematic journey.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
            Explore
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/watchlist" className="hover:text-primary transition-colors">
              Watchlist
            </Link>
          </div>
        </div>

        {/* Meta */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
            About
          </h3>
          <p className="text-sm text-muted-foreground">
            Built with React, Express, Prisma, and TMDB API.
            Designed for learning full-stack development.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Popcorn List — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;