const sessionId = sessionStorage.getItem('sessionID'); // eslint-disable-line no-undef

const http = {
  get: url =>
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        SessionId: sessionId
      }
    }).then(res => res.json()),
  post: (url, body) =>
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        SessionId: sessionId
      },
      body
    }).then(res => res.json())
};

module.exports = http;
