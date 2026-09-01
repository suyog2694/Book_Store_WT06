import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="container profile-page section-block">
      <div className="profile-card">
        <div className="profile-avatar">
          <UserRound size={42} />
        </div>

        <div className="profile-content">
          <span className="eyebrow accent">My Account</span>
          <h2>{currentUser?.name || 'Demo User'}</h2>
          <p>{currentUser?.email || 'demo@mybooks.com'}</p>
        </div>

        <div className="profile-actions">
          <Link to="/orders" className="outline-btn">
            <ShoppingBag size={18} />
            My Orders
          </Link>
          <Link to="/cart" className="outline-btn">
            My Cart
          </Link>
          <button type="button" className="primary-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
