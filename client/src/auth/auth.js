import axios from 'axios';
let login = false;
export const httpRequest = axios.create();
httpRequest.interceptors.response.use(response => {
  return response;
}, err => {
  return Promise.reject(new Error(err.response.data.message));
});

async function updateLoginStatus() {
  try {
    const httpRes = await httpRequest.get('/api/users/check');
    login = true;
  } catch(err) {
    login = false;
  }
  return login;
}

async function signUp(username, password) {
  try {
    const httpRes = await httpRequest.post('/api/users/signUp', {username, password});
    alert(httpRes.data.message);
  } catch(err) {
    alert(err.message);
  }
}

async function signIn(username, password) {
  try {
    const httpRes = await httpRequest.post('/api/users/signIn', {username, password});
    login = true;
    alert(httpRes.data.message);
  } catch(err) {
    alert(err.message);
  }
}

async function signOut() {
  try {
    const httpRes = await httpRequest.get('/api/users/signOut');
  } catch(err) {
    alert(err.message);
  }
}

function loginStatus() {
  return login;
}

export function useAuth() {
  return {
    loginStatus,
    updateLoginStatus,
    signIn,
    signUp,
    signOut
  }
}