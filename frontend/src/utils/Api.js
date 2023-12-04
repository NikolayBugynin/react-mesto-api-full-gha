// import { BASE_URL } from "./auth";

// class Api {
//   constructor({ baseUrl, headers }) {
//     // urls
//     this._url = baseUrl;
//     this._getInfo = `${this._url}/users/me`;
//     this._getCards = `${this._url}/cards`;
//     this._editProfile = `${this._url}/users/me`;
//     this._editAvatar = `${this._url}/users/me/avatar`;
//     this._addCard = `${this._url}/cards`;
//     this._deleteCard = `${this._url}/cards`; //--'/cardId'
//     this._like = `${this._url}/cards/likes`; //-- 'cardId'

//     this._checkResponse = (response) => {
//       if (response.ok) {
//         const res = response.json();
//         return res;
//       }
//       return Promise.reject(`Ошибка: ${response.status}`);
//     };

//     this._request = async (url, { headers, body, method }) => {
//       return await fetch(url, {
//         headers: headers,
//         body: body,
//         method: method,
//       }).then(this._checkResponse);
//     };

//     // for requests
//     this._headers = headers;
//     this._get = { headers: this._headers, method: "GET" };
//     this._patch = ({ name, about, avatar }) => {
//       let body;
//       name && about
//         ? (body = { name: name, about: about })
//         : (body = { avatar: avatar });
//       return {
//         headers: this._headers,
//         method: "PATCH",
//         body: JSON.stringify(body),
//       };
//     };

//     this._post = (img, token) => {
//       return {
//         headers: {Authorization: `Bearer ${token}`, ...this._headers},
//         method: "POST",
//         body: JSON.stringify({
//           name: img.name,
//           link: img.link,
//         }),
//       };
//     };

//     this._delete = () => {
//       return {
//         headers: this._headers,
//         method: "DELETE",
//       };
//     };

//     this._put = () => {
//       return {
//         headers: this._headers,
//         method: "PUT",
//       };
//     };
//   }

//   // requests
//   getInfo() {
//     return this._request(this._getInfo, this._get);
//   }

//   getCards() {
//     return this._request(this._getCards, this._get);
//   }

//   getInitialData() {
//     return Promise.all([this.getInfo(), this.getCards()]);
//   }

//   editProfile(info) {
//     return this._request(this._editProfile, this._patch(info));
//   }

//   addCard(img, token) {
//     return this._request(this._addCard, this._post(img, token));
//   }

//   deleteCard(cardId) {
//     return this._request(`${this._deleteCard}/${cardId}`, this._delete());
//   }

//   setLike(cardId) {
//     return this._request(`${this._like}/${cardId}`, this._put());
//   }

//   removeLike(cardId) {
//     return this._request(`${this._like}/${cardId}`, this._delete());
//   }

//   newAvatar(link) {
//     return this._request(this._editAvatar, this._patch(link));
//   }
// }

// export const api = new Api({
//   baseUrl: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: 'application/json',
//   },
// });

import { BASE_URL } from "./auth";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _dataHeaders = () => {
    this._token = localStorage.getItem('token');
    this._headers.authorization = `Bearer ${this._token}`
    return this._headers;
  }

  //метод проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

    getInitialData() {
    return Promise.all([this.getInfo(), this.getCards()]);
  }

  editProfile(dataInput) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._dataHeaders(),
      body: JSON.stringify({
        name: dataInput.name,
        about: dataInput.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  newAvatar(dataForm) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: dataForm.avatar,
      }),
      headers:this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  addCard(dataCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link,
      }),
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._dataHeaders(),
      }
    ).then((res) => this._checkResponse(res));
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: 'application/json',
  },
});