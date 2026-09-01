import api from "./api";

export const createOrder = async (bookId, quantity = 1) => {
  const response = await api.post("/orders/buy-now", {
    book_id: bookId,
    quantity,
  });

  return response.data;
};

export const checkoutCart = async () => {
  const response = await api.post("/orders/checkout");

  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};