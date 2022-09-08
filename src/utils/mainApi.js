class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getCurrentUser(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  getArticles(token) {
    return fetch(this._baseUrl + '/articles', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  saveArticle(data, searchKeyword, token) {    
    const {
      title,
      description: text,
      publishedAt: date,
      url: link,
      urlToImage: image,
    } = data;    
    const source = data.source.name;
    
    const keyword =
      searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1);

    return fetch(this._baseUrl + '/articles', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  deleteArticle(articleId, token) {
    return fetch(this._baseUrl + '/articles/' + articleId, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then((res) => {
      return this._returnRes(res);
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000'
  // baseUrl: 'https://nomoreparties.co/news/v2/everything'
});

export default api;
