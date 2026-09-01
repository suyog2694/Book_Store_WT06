import { ArrowRight, BookOpen, Headphones, Heart, Search, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero-section"><div className="container hero-content">
        <div className="hero-text reveal-up"><span className="eyebrow accent">A better bookshelf awaits</span><h1>Stories worth making room for.</h1><p>Curated books, thoughtful recommendations, and the simple joy of finding your next favorite read.</p><div className="hero-actions"><Link to="/catalogue" className="primary-btn">Explore the catalogue <ArrowRight size={17} /></Link><a href="#why-mybooks" className="secondary-btn">Why MyBooks?</a></div><div className="hero-proof"><span><ShieldCheck size={16} /> Trusted checkout</span><span><Truck size={16} /> Delivered with care</span></div></div>
        <div className="hero-visual reveal-up" aria-label="A stack of books"><div className="book-showcase"><div className="showcase-book book-back"><span>THE<br />GOOD<br />LIFE</span></div><div className="showcase-book book-middle"><span>SMALL<br />WONDERS</span></div><div className="showcase-book book-front"><BookOpen size={34} /><span>YOUR NEXT<br />CHAPTER</span></div></div><div className="floating-card card-one"><Sparkles size={16} /><strong>Handpicked</strong><small>Reads for every mood</small></div><div className="floating-card card-two"><Heart size={16} /><strong>Made for readers</strong><small>Find something to keep</small></div></div>
      </div></section>
      <section className="container intro-section" id="why-mybooks"><div className="section-heading"><span className="eyebrow">The MyBooks difference</span><h2>A calmer way to discover books.</h2><p>Everything you need to browse, choose, and enjoy your next great read.</p></div><div className="feature-grid"><div className="feature-card"><div className="feature-icon"><Search size={23} /></div><h3>Easy to explore</h3><p>Search by title, author, or category and get to the good stuff faster.</p></div><div className="feature-card"><div className="feature-icon"><Sparkles size={23} /></div><h3>Curated variety</h3><p>From timeless fiction to practical guides, there is always another world to open.</p></div><div className="feature-card"><div className="feature-icon"><Truck size={23} /></div><h3>Simple ordering</h3><p>A clear cart, quick checkout, and a smooth path from shelf to doorstep.</p></div><div className="feature-card"><div className="feature-icon"><Headphones size={23} /></div><h3>Here to help</h3><p>Questions about your order? Our support team is only a message away.</p></div></div></section>
    </main>
  );
};

export default Home;
