const sessionId = sessionStorage.getItem('sessionID') // eslint-disable-line no-undef
const commonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'SessionId': sessionId
};

const http = {
  handleErrorResponse: (res) => {
    console.log(res)
  },
  get: (url) =>
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: commonHeaders
    })
      .then(res => res.json())
      .catch( err => this.handleErrorResponse(err))
  ,
  post: (url, body) =>
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: commonHeaders,
      body
    }).then(res => res.json()),
  put: (url, body) =>
    fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: commonHeaders,
      body
    }).then(res => res.json()),
  HTTPDelete: url =>
    fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: commonHeaders
    }).then(res => res.json())
}

module.exports = http;
