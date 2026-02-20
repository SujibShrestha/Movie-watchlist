import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { toggleDark } from "../lib/theme";
import { Home, Moon, SunMedium, Tv } from "lucide-react";
import { useState } from "react";
import { ProfileIcon } from "./ProfileIcon";
const Navbar = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const location = useLocation();
  const handleToggle = () => {
    const newTheme = toggleDark();
    setDarkMode(newTheme);
  };

  const navLink = (path: string) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-accent"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Popcorn List" className="w-10 h-10" />

          <h1 className="text-2xl max-sm:hidden  font-semibold text-foreground">
            Popcorn List
          </h1>
        </Link>

        {/* Navigation */}
        <div className="max-sm:pl-10 flex gap-2">
          <Link to="/" className={`flex items-center gap-2 ${navLink("/")}`}>
            <Home className="w-5 h-5" />
            <p className="max-sm:hidden">Home</p>
          </Link>

          <Link
            to="/watchlist"
            className={`flex items-center gap-2 ${navLink("/watchlist")}`}
          >
            <Tv className="w-5 h-5" />
            <p className="max-sm:hidden">Watchlist</p>
          </Link>
        </div>
        <div className=" flex items-center ">
          <button
            onClick={handleToggle}
            className="px-3 py-1 rounded-md  text-foreground"
          >
            {isDarkMode ? (
              <SunMedium className="w-5 h-5 ease-in" />
            ) : (
              <Moon className="w-5 h-5 ease-in" />
            )}
          </button>
          {/* Profile */}
          <div>
            <ProfileIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
