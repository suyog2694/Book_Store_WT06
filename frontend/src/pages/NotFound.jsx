import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container not-found-page section-block">
      <div className="not-found-box">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or may have moved.</p>
        <Link to="/" className="primary-btn">Return Home</Link>
      </div>
    </main>
  );
};

export default NotFound;
