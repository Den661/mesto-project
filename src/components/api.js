
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'f3af3a32-1630-4f2d-93bf-f554187b89c2',
    'Content-Type': 'application/json'
  }
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {return checkResponse(res)});
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {return checkResponse(res)})
}

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
}

export function editProfile(name, about) {
return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
})
  .then(res => {return checkResponse(res)})
}

export function addPlace(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {return checkResponse(res)})
}

export function deleteCard (cardId){
  return fetch (`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {return checkResponse(res)})
}

export function addLike(cardId) {
 return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
   method: 'PUT',
   headers: config.headers
 })
   .then(res => {return checkResponse(res)})
}

export  function deleteLike(cardId) {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {return checkResponse(res)})
}

export function updateAvatar(link) {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(res => {return checkResponse(res)})
}
