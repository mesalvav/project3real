import React from 'react';
import { Card, CardImg, CardText, CardBody, Button, Modal, ModalHeader,
  ModalBody, Form, FormGroup, Input, Label, 
  CardTitle, Breadcrumb, BreadcrumbItem, ListGroupItem,ListGroup
 } from 'reactstrap';

import { Link } from 'react-router-dom';
import CommentService from '../services/commentService';

function RenderDish({dish}) {
  return(
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  )
}
 
function RenderComments({comments}) {

console.log("comments = => " + comments);

    return (comments.map((cx, ijk)=>{
                          return <ListGroupItem key={ijk} >
                              <div>{cx.comment}</div>
                              <div>{cx.rating} of 5 -by-  {cx.author.username} , 
                              <span>  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cx.createdAt)))}</span>
                              </div>
                              

                              <Button  type="submit" value="submit" color="danger">Delete</Button>
                             
                          </ListGroupItem> }));

}

class DishDetail extends React.Component {

constructor(props){
  super(props)

  this.state = {
    isModalOpen: false,
    thename: 'nombre',
    rating: '1',
    message: 'comment here'
};
// this.RenderComments = this.RenderComments.bind(this);
this.commentservice = new CommentService();
}
//
 

//


toggleModal = ()=> {
  console.log("togglin modal..");
  this.setState({
    isModalOpen: !this.state.isModalOpen
  });
}

handleDeleteComment = (event)=> {
  console.log('Current State is: ' + JSON.stringify(this.state));
   alert('Current State is: ' + JSON.stringify(this.state));
  event.preventDefault();
}

handleSubmit = (event)=> {
  console.log('Current State is: ' + JSON.stringify(this.state));
  //  alert('Current State is: ' + JSON.stringify(this.state));
  event.preventDefault();
  this.commentservice
  .addNewComment(this.state.rating, 
                  this.state.message,
                  this.props.currentlyLoggedInDetail._id,
                  this.props.dish._id 
                  )
  .then((response)=>{
    console.log(response);
    this.props.getAllDishes();
    this.toggleModal();

  })
  .catch(err=>{console.log(err);})
}

handleInputChange = (event)=> {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  // const value =  target.value;

  const name = target.name;

  this.setState({
    [name]: value
  });
console.log(" values  " + event.target.value);
  
}

  render(){
    console.log("from dish detail render currentlyLoggedIn " + this.props.location)
    console.log(this.props.currentlyLoggedInDetail)
    
    if(  this.props.dish != null ) 
    {
      return (
  
          <div className="container">
          <div className="row">
              <Breadcrumb>
  
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
              { this.props.currentlyLoggedInDetail && 
              <h4>username: { this.props.currentlyLoggedInDetail.username }
                
              </h4>
               
              }
              {/* <div>{JSON.stringify( this.props.dish.comments)}</div> */}
                  <hr />
              </div>                
          </div>
          <div className="row">
              <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={this.props.dish} />
              </div>
              <div className="col-12 col-md-5 m-1">
                <h3>Comments</h3>
                  { this.props.currentlyLoggedInDetail &&
                  <Button outline onClick={this.toggleModal} type="submit" value="submit" color="primary">Leave a Comment</Button>
                  }
                  <ListGroup>

                  <RenderComments comments={this.props.dish.comments} />
                  </ListGroup>
              </div>
          </div>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>

                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                      <Label htmlFor="rating">Rating</Label>
                      
                      <Input  type="select" name="rating" id="rating" 
                                           onChange={this.handleInputChange}
                                           value={this.state.rating}
                                           >
                                        <option >1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        
                                    </Input>
                    </FormGroup>
                      {/* <FormGroup>
                          <Label htmlFor="name">Name</Label>
                          <Input type="text" id="thename" name="thename"
                          value={this.state.thename}
                            onChange={this.handleInputChange} />
                      </FormGroup> */}
                      <FormGroup >
                          <Label htmlFor="message" >Comment</Label>
                          
                              <Input type="textarea" id="message" name="message"
                                  rows="12"
                                  value={this.state.message}
                                  onChange={this.handleInputChange}
                                  ></Input>
                          
                      </FormGroup>
                      <Button type="submit" value="submit" color="primary">Submit</Button>
                    </Form>

                </ModalBody>
                </Modal>

          </div>
      
    );
  
    } 
    else 
    {return (<div></div>);}
  }
}



export default DishDetail;
