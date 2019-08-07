import axios from 'axios';
// baseURL: 'http://localhost:5000/api/users',
class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/users`, 
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