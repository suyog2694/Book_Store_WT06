import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  CalendarDays,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import "../styles/profile.css";

const Profile = () => {
  const {
    currentUser,
    logout,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="profile-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <h2>Unable to load profile</h2>
          <p>Please login again to continue.</p>
        </div>
      </div>
    );
  }

  const getInitial = () => {
    if (!currentUser.name) return "U";

    return currentUser.name
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-page">

      <main className="profile-container">

        {/* ================= HEADER ================= */}

        <section className="profile-heading">
          <span className="profile-eyebrow">
            My Account
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your account information and
            preferences.
          </p>
        </section>

        {/* ================= PROFILE CARD ================= */}

        <section className="profile-card">

          {/* Profile top */}

          <div className="profile-card-top">

            <div className="profile-avatar">
              {getInitial()}
            </div>

            <div className="profile-main-info">
              <h2>{currentUser.name}</h2>

              <p>
                <Mail size={16} />
                {currentUser.email}
              </p>

              <span className="profile-badge">
                <ShieldCheck size={15} />
                Active Account
              </span>
            </div>

          </div>

          {/* Divider */}

          <div className="profile-divider"></div>

          {/* ================= DETAILS ================= */}

          <div className="profile-details">

            <div className="profile-detail">

              <div className="detail-icon">
                <User size={19} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{currentUser.name}</strong>
              </div>

            </div>

            <div className="profile-detail">

              <div className="detail-icon">
                <Mail size={19} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>{currentUser.email}</strong>
              </div>

            </div>

            <div className="profile-detail">

              <div className="detail-icon">
                <CalendarDays size={19} />
              </div>

              <div>
                <span>Member Since</span>
                <strong>
                  {formatDate(
                    currentUser.created_at
                  )}
                </strong>
              </div>

            </div>

          </div>

          {/* ================= LOGOUT ================= */}

          <div className="profile-actions">

            <button
              type="button"
              className="profile-logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </section>

        {/* ================= ACCOUNT INFO ================= */}

        <section className="profile-info-card">

          <div className="info-card-icon">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h3>Your account is secure</h3>

            <p>
              Your account information is securely
              managed by MyBooks. Your password is
              encrypted and is never displayed here.
            </p>
          </div>

        </section>

        {/* ================= DEVELOPER MARK ================= */}

        <div className="profile-developer-mark">
          © Suyog Marathe-01
        </div>

      </main>

    </div>
  );
};

export default Profile;