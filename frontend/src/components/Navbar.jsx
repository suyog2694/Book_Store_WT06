import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut, BookOpen, Home, ListOrdered } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { to: '/', label: 'Home', icon: Home },
        { to: '/catalogue', label: 'Catalogue', icon: BookOpen },
        { to: '/cart', label: 'Cart', icon: ShoppingCart },
        { to: '/orders', label: 'Orders', icon: ListOrdered },
        { to: '/profile', label: 'Profile', icon: User },
      ]
    : [
        { to: '/', label: 'Home', icon: Home },
        { to: '/catalogue', label: 'Catalogue', icon: BookOpen },
        { to: '/login', label: 'Login', icon: User },
        { to: '/register', label: 'Register', icon: User },
      ];

  return (
    <header className="navbar-wrap">
      <nav className="navbar container">
        <Link to="/" className="nav-brand" aria-label="MyBooks home">
          <span className="brand-mark">M</span>
          <span>MyBooks</span>
        </Link>

        <div className="nav-links desktop-nav">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className="nav-link" end={to === '/'}>
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}

          {isAuthenticated && (
            <button type="button" className="nav-link nav-button logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          )}

          {isAuthenticated && (
            <NavLink to="/cart" className="nav-link cart-pill" aria-label="Cart">
              <ShoppingCart size={16} />
              <span>Cart</span>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </NavLink>
          )}
        </div>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileOpen((state) => !state)}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className="mobile-link" onClick={() => setMobileOpen(false)} end={to === '/'}>
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}

          {isAuthenticated && (
            <button type="button" className="mobile-link logout-mobile" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
