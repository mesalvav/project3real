import axios from 'axios';

class dishService {
  constructor(){
    let service = axios.create({
      baseURL: 'http://localhost:5000/api/dishes',
      withCredentials: true,
    });
    this.service = service;
  }

  getAllDishes = ()=>{
    return this.service.get('/')
    .then(response => response.data)
  }
}

export default dishService;