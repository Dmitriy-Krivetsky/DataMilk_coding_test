const API_URL = 'http://127.0.0.1:9000';

export const postJSON = (method) => {
  return fetch(API_URL+method)
    .then(response => response.json())
    .then(res => res)
    .catch(error => new Error(error))
};
