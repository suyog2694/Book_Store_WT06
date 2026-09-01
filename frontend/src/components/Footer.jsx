import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>MyBooks</h3>
          <p>Discover timeless reads, practical guides, and stories that inspire your next chapter.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/catalogue">Catalogue</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>support@mybooks.com</li>
            <li>+91 98765 43210</li>
            <li>About Us</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Suyog Marathe-01</p>
      </div>
    </footer>
  );
};

export default Footer;
