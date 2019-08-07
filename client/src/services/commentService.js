import axios from 'axios';

class CommentService {
  constructor(){
    let service = axios.create({
      baseURL: 'http://localhost:5000/api/comments',
      withCredentials: true,
    });
    this.service = service;
  }


  addNewComment = (rating, comment, author, dishid)=> {
  
    return this.service.post('/addcomment', {
      rating: rating, comment: comment, author: author, dishid
    })
    .then(response => response.data)
    .catch(err=>console.log(err))
  }

  deleteComment = (dishid, commentid)=>{
    return this.service.post('deletecomment', {dishid,commentid })
    .then(response=>response.data)
    .catch(err=>{console.log(err)})
  }
  
}



export default CommentService;