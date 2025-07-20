import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* ✅ CLICKABLE LOGO */}
      <Link to="/" className="logo">
        🌖&nbsp;Eclipse
      </Link>

      {/* RIGHT-HAND LINKS */}
      <ul className="nav-links">
        <li><Link to="/mood">Mood Tracker</Link></li>
        <li><Link to="/journal">Journal</Link></li>
        <li><Link to="/light-moments">Light Moments</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>

      <div className="nav-signin">
        <Link to="/login" className="signin-btn galaxy-glow">Sign In</Link>
      </div>
    </nav>
  );
}
