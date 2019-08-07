import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api/users',
      withCredentials: true,
    });
    this.service = service;
  }

  login = (username, password) =>{
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  logout = () =>{
    console.log("you did logout!");
    return this.service.post('/logout', {})
    .then(response => response.data)
  }

  signup = (username, password) => {
    return this.service.post('/signup', {username:username, password:password})
    .then(response => response.data)
  }

  currentUser = () =>{
    return this.service.get('/getcurrentuser')
    .then(response => response.data)
  }

}

export default AuthService;