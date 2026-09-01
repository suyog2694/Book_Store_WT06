import { useEffect, useState } from "react";
import {
  Package,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock3,
} from "lucide-react";
import { getOrders } from "../services/orderService";
import Loading from "../components/Loading";
import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        if (data.success) {
          setOrders(data.orders || []);
        } else {
          setError(data.message || "Failed to load orders.");
        }
      } catch (err) {
        console.error("Failed to load orders:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const toggleOrder = (orderId) => {
    setExpandedOrders((current) => ({
      ...current,
      [orderId]: !current[orderId],
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="orders-page">
      <main className="orders-container">

        {/* ================= HEADER ================= */}

        <section className="orders-hero">
          <div className="orders-hero-content">
            <span className="orders-eyebrow">
              My Account
            </span>

            <h1>My Orders</h1>

            <p>
              Track and review your previous purchases.
            </p>

            <div className="orders-summary">
              <Package size={19} />
              <span>
                {orders.length}{" "}
                {orders.length === 1 ? "Order" : "Orders"}
              </span>
            </div>
          </div>

          <div className="orders-hero-decoration">
            <div className="package-icon">
              <Package size={54} strokeWidth={1.5} />
            </div>

            <div className="calendar-decoration">
              <CalendarDays size={27} />
            </div>
          </div>
        </section>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="orders-error">
            {error}
          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!error && orders.length === 0 && (
          <section className="empty-orders">
            <div className="empty-orders-icon">
              <Package size={42} />
            </div>

            <h2>No orders yet</h2>

            <p>
              Your purchased books will appear here once
              you place your first order.
            </p>
          </section>
        )}

        {/* ================= ORDERS ================= */}

        {!error && orders.length > 0 && (
          <section className="orders-list">

            {orders.map((order) => {
              const isExpanded =
                expandedOrders[order.id] ?? true;

              return (
                <article
                  className="order-card"
                  key={order.id}
                >

                  {/* ---------- ORDER HEADER ---------- */}

                  <div className="order-header">

                    <div className="order-heading">

                      <div className="order-number">
                        <CalendarDays size={20} />
                        <h2>Order #{order.id}</h2>
                      </div>

                      <div className="order-meta">

                        <span>
                          <CalendarDays size={16} />
                          {formatDate(order.ordered_at)}
                        </span>

                        <span className="meta-separator">
                          •
                        </span>

                        <span>
                          <Clock3 size={16} />
                          {formatTime(order.ordered_at)}
                        </span>

                        <span
                          className={`order-status ${String(
                            order.status || ""
                          ).toLowerCase()}`}
                        >
                          <span className="status-dot"></span>
                          {order.status}
                        </span>

                      </div>
                    </div>

                    <div className="order-header-right">

                      <div className="order-total-header">
                        <span>Total Amount</span>

                        <strong>
                          ₹
                          {Number(
                            order.total_amount
                          ).toFixed(2)}
                        </strong>
                      </div>

                      <button
                        type="button"
                        className="order-toggle"
                        onClick={() =>
                          toggleOrder(order.id)
                        }
                        aria-label={
                          isExpanded
                            ? "Collapse order"
                            : "Expand order"
                        }
                      >
                        {isExpanded ? (
                          <ChevronUp size={21} />
                        ) : (
                          <ChevronDown size={21} />
                        )}
                      </button>

                    </div>
                  </div>

                  {/* ---------- ORDER ITEMS ---------- */}

                  {isExpanded && (
                    <div className="order-items">

                      {(order.items || []).map(
                        (item, index) => (
                          <div
                            className="order-item"
                            key={`${order.id}-${item.book_id}-${index}`}
                          >

                            {/* BOOK IMAGE */}

                            <div className="order-book-image">
                              <img
                                src={
                                  item.image_url ||
                                  "/images/books/placeholder.jpg"
                                }
                                alt={item.title}
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/images/books/placeholder.jpg";
                                }}
                              />
                            </div>

                            {/* BOOK INFO */}

                            <div className="order-book-info">

                              <h3>{item.title}</h3>

                              <p>
                                {item.author}
                              </p>

                              <span className="quantity-badge">
                                Quantity:{" "}
                                {item.quantity}
                              </span>

                            </div>

                            {/* PRICE */}

                            <div className="order-item-price">

                              <strong>
                                ₹
                                {Number(
                                  item.price
                                ).toFixed(2)}
                                <span>
                                  {" "}
                                  × {item.quantity}
                                </span>
                              </strong>

                              <small>
                                Price: ₹
                                {Number(
                                  item.price
                                ).toFixed(2)}
                              </small>

                            </div>

                            {/* ITEM TOTAL */}

                            <div className="item-total">

                              <span>
                                Item Total
                              </span>

                              <strong>
                                ₹
                                {(
                                  Number(item.price) *
                                  Number(item.quantity)
                                ).toFixed(2)}
                              </strong>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                  {/* ---------- MOBILE / COLLAPSED TOTAL ---------- */}

                  {!isExpanded && (
                    <div className="collapsed-order-footer">
                      <span>
                        {order.items?.length || 0}{" "}
                        {order.items?.length === 1
                          ? "item"
                          : "items"}
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.total_amount
                        ).toFixed(2)}
                      </strong>
                    </div>
                  )}

                </article>
              );
            })}

          </section>
        )}

        {/* ================= FOOTER ================= */}

        <div className="orders-developer-mark">
          © Suyog Marathe-01
        </div>

      </main>
    </div>
  );
};

export default Orders;