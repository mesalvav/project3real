import axios from 'axios';
// baseURL: 'http://localhost:5000/api/dishes'
class dishService {
  constructor(){
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/dishes`, 
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