

const today = new Date();
const weekAgo = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _returnRes = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  searchArticles(keyword) {
    return fetch(
      `${
        this._baseUrl
      }?q=${keyword}&from=${weekAgo.toISOString()}&to=${today.toISOString()}&language=en&sortBy=relevancy&pageSize=${100}&apiKey=${'0d72cd9decf647118e7f8c7d18965d3d'}`
    )
      .then((res) => this._returnRes(res))
      .then((res) => res.articles);
  }
}

const newsApi = new NewsApi({
  baseUrl: 'http://localhost:3000',
  // baseUrl: 'https://nomoreparties.co/news/v2/everything',
  // baseUrl: 'https://newsapi.org/v2/everything',
  headers: {
    'Content-Type': 'X-Api-Key',
  },
});

export default newsApi;
