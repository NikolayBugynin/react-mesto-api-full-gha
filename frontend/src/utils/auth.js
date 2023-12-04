export const BASE_URL = process.env.REACT_APP_API_URL

// export const register = (email, password) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ password, email }),
//   }).then(checkResponse);
// };

// export const authorize = (email, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ password, email }),
//   }).then(checkResponse);
// };

// //проверки валидности токена и получения email для вставки в шапку сайта:
// export const getContent = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// };

// const checkResponse = (res) =>
//   res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);


  export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
      // credentials: 'include',
    }).then((res) => checkResponse(res));
  };
  
  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
      // credentials: 'include',
    }).then((res) => checkResponse(res));
  };
  //проверки валидности токена и получения email для вставки в шапку сайта:
  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => checkResponse(res));
  };

  const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);