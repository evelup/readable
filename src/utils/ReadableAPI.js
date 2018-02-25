const api = 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json',
};


export const getAllCategories = () => {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
};

export const getAllPosts = () => {
  return fetch(`${api}/posts`, { headers })
    .then(res => res.json())
};

export const getPostFromCategory = category => {
  return fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
};

export const getSinglePost = id => {
  return fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
};

export const addPost = form => {
  return fetch(`${api}/posts`, {
    method: 'post',
    headers,
    body: JSON.stringify(form)
  })
    .then(res => res.json())
};

export const editPost = form => {
  return fetch(`${api}/posts/${form.id}`, {
    headers,
    method: 'put',
    body: JSON.stringify(form)
  })
    .then(res => res.json())
};

export const deletePost = id => {
  return fetch(`${api}/posts/${id}`, {
    headers,
    method: 'delete'
  })
    .then(res => res.json())
};

export const getComments = id => {
  return fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
};

export const getSingleComment = id => {
  return fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
};

export const addComment = form => {
  return fetch(`${api}/comments`, {
    headers,
    method: 'post',
    body: JSON.stringify(form)
  })
    .then(res => res.json())
};

export const editComment = form => {
  return fetch(`${api}/comments/${form.id}`, {
    headers,
    method: 'put',
    body: JSON.stringify(form)
  })
    .then(res => res.json())
};

export const deleteComment = id => {
  return fetch(`${api}/comments/${id}`, {
    headers,
    method: 'delete'
  })
    .then(res => res.json())
};

export const voteUpComment = (id) => {
  return fetch(`${api}/comments/${id}`, {
    headers,
    method: 'post',
    body: JSON.stringify({ option: 'upVote' })
  })
    .then(res => res.json())
};

export const voteDownComment = (id) => {
  return fetch(`${api}/comments/${id}`, {
    headers,
    method: 'post',
    body: JSON.stringify({ option: 'downVote' })
  })
    .then(res => res.json())
};

export const voteUpPost = (id) => {
  return fetch(`${api}/posts/${id}`, {
    headers,
    method: 'post',
    body: JSON.stringify({ option: 'upVote' })
  })
    .then(res => res.json())
};

export const voteDownPost = (id) => {
  return fetch(`${api}/posts/${id}`, {
    headers,
    method: 'post',
    body: JSON.stringify({ option: 'downVote' })
  })
    .then(res => res.json())
};



