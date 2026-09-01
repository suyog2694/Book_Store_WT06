import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import BookCard from '../components/BookCard';
import BookDetails from '../components/BookDetails';
import Loading from '../components/Loading';
import { getBooks } from '../services/bookService';
import '../styles/catalogue.css';

const Catalogue = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBook, setSelectedBook] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch books from Node.js + MySQL
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getBooks();

        if (data.success) {
          setBooks(data.books);
        } else {
          setError('Unable to load books.');
        }
      } catch (err) {
        console.error('Error loading books:', err);
        setError('Unable to connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Generate categories from database books
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        books
          .map((book) => book.category)
          .filter(Boolean)
      ),
    ];

    return ['All', ...uniqueCategories];
  }, [books]);

  // Search + filter + sorting
  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (category !== 'All') {
      result = result.filter(
        (book) => book.category === category
      );
    }

    if (query.trim()) {
      const search = query.toLowerCase();

      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search)
      );
    }

    if (sortBy === 'low-to-high') {
      result.sort(
        (a, b) => Number(a.mrp) - Number(b.mrp)
      );
    } else if (sortBy === 'high-to-low') {
      result.sort(
        (a, b) => Number(b.mrp) - Number(a.mrp)
      );
    }

    return result;
  }, [books, query, category, sortBy]);

  return (
    <main className="catalogue-page container section-block">

      <div className="catalogue-header">
        <div>
          <span className="eyebrow accent">
            Catalogue
          </span>

          <h1>Find your perfect read</h1>
        </div>
      </div>

      <div className="catalogue-controls">

        <label className="search-box">
          <Search size={18} />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
          />
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item === 'All'
                ? 'All Categories'
                : item}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="featured">
            Sort: Featured
          </option>

          <option value="low-to-high">
            Sort: Price Low to High
          </option>

          <option value="high-to-low">
            Sort: Price High to Low
          </option>
        </select>

      </div>

      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {!loading && error && (
        <div className="empty-state">
          <h3>Something went wrong</h3>

          <p>{error}</p>

          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Books */}
      {!loading && !error && (
        <>
          <div className="book-grid catalogue-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={() =>
                  setSelectedBook(book)
                }
              />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="empty-state">
              <h3>No books found</h3>

              <p>
                Try a different search or category.
              </p>
            </div>
          )}
        </>
      )}

      {/* Book Details */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

    </main>
  );
};

export default Catalogue;