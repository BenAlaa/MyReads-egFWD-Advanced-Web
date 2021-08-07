import http from './http.service';

const getById = async (bookId) => {
  return await http.get(`/books/${bookId}`);
};

const getAll = async () => {
  return await http.get('/books');
};

const update = async (bookId, shelf) => {
  return await http.put(`/books/${bookId}`, shelf);
}

const search = async (query) => {
  return await http.post('/books/search', query)
}

const apis = {
  getById,
  getAll,
  update,
  search
}
export default apis
