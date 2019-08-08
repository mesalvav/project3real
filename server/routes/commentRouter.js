const express = require('express');
const router  = express.Router();
const Comment = require('../models/comments');
const Dish = require('../models/dishes');

/* GET home page */
router.get('/:dishid', (req, res, next) => {
  
  Dish.findById(req.params.dishid).populate('comments')
  .then(dishx => {
    res.status(200).json(dishx.comments );

  })
  .catch(err=>console.log(err))
  
  

});

router.post('/addcomment', (req, res, next) => {
  const { rating , comment, author, dishid } = req.body;

  Comment.create({rating: rating, comment: comment, author: author})
  .then((commentx)=>{

      Dish.findByIdAndUpdate(dishid, { $push:{comments: commentx._id}})
      .then((response)=>{  res.json({response, commentx}) })
      .catch(err=>{ res.json(err)  });
  })
  .catch(err=>{ res.json(err)  });

  
});

router.post('/deletecomment', (req, res, next) => {
  const {  dishid, commentid } = req.body;
  
  Comment.findOneAndRemove(commentid)
  .then((response=>{
    res.status(200).json(response);

  }))
  .catch(err=>console.log(err))
  // Dish.findById(dishid)
  // .then((dishx)=>{  
    
  //   // const indexofdishx = dishx.comments.findIndex(commentid);
  //     let comms = [...dishx.comments];
  //     let filtered = comms.filter(ele=> ele._id.toString() === commentid );



  //   res.status(200).json({filtered, commentid});
        
  //    })
  //   .catch( err=>{ res.json(err)  } );

  })
 
  router.post('/updatecomment', (req, res, next) => {
    const {  commentid, rating, comment } = req.body;
     
    Comment.findByIdAndUpdate(commentid, {rating:rating, comment: comment})
    .then((response=>{
      res.status(200).json(response);
  
    }))
    .catch(err=>console.log(err))
  
  })


module.exports = router;