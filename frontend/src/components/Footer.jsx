import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo"><span className="brand-mark">M</span> MyBooks</Link>
          <p>Discover timeless reads, practical guides, and stories that inspire your next chapter.</p>
          <div className="footer-socials"><a href="mailto:support@mybooks.com" aria-label="Email support"><Mail size={17} /></a><a href="https://mybooks.com" aria-label="MyBooks website"><Globe size={17} /></a></div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li><li><Link to="/catalogue">Catalogue</Link></li><li><Link to="/cart">Your cart</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li><Mail size={15} /> support@mybooks.com</li><li><Phone size={15} /> +91 98765 43210</li><li><MapPin size={15} /> Pune, Maharashtra</li>
          </ul>
        </div>
        <div><h4>Need a hand?</h4><p className="footer-support">Our team is available Monday to Saturday, 10:00 AM to 6:00 PM.</p><a className="footer-contact" href="mailto:support@mybooks.com">Contact support <ArrowUpRight size={15} /></a></div>
      </div>

      <div className="footer-bottom">
        <p>© Suyog Marathe-01</p>
      </div>
    </footer>
  );
};

export default Footer;
