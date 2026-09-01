import api from "./api";

export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};

export const addToCart = async (bookId, quantity = 1) => {
  const response = await api.post("/cart", {
    book_id: bookId,
    quantity,
  });

  return response.data;
};

export const updateCart = async (bookId, quantity) => {
  const response = await api.put(`/cart/${bookId}`, {
    quantity,
  });

  return response.data;
};

export const removeFromCart = async (bookId) => {
  const response = await api.delete(`/cart/${bookId}`);

  return response.data;
};