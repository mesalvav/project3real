import React, { Component } from 'react';

import Menu from './MenuComponent';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';

import { Switch, Route, Redirect } from 'react-router-dom';

// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import DishService from '../services/dishService';
import AuthService from '../services/AuthService';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      currentlyLoggedIn: null,
      dishes: [],
     
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
    this.dishservice = new DishService();
    this.authservice = new AuthService();
  }
  
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
    // console.log("==== was clicked. line 19 id ===> "  );
  }

  componentDidMount(){
    this.getAllDishes();
  }

  getAllDishes = ()=>{
    this.dishservice.getAllDishes()
    .then((datum)=>{
      // console.log(datum[0]);
      //datum[0].comments.map(eachComment=>{ console.log(eachComment); return true;});

      this.setState({dishes: datum, ready: true});
    })
    .catch(err=>{console.log("dish service call " + err)})
  }


  getCurrentlyLoggedInUser = () =>{
    this.authservice.currentUser()
    .then((theUser)=>{
      this.setState({currentlyLoggedIn: theUser})
      console.log("getCurrentlyLoggedInUser=>  " + JSON.stringify(this.state.currentlyLoggedIn));
    })
    .catch((err)=>{
      console.log("err getCurrentlyLoggedInUser  " + err)
      this.setState({currentlyLoggedIn: null})
    })
  }

  render() {

    const HomePage = () => {
      return(
          <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
              ready={this.state.ready}
          />
      );
    }
 
    const DishWithId = ({match, props}) => {
      // <DishDetail dish={this.state.dishes.filter((dish) => dish._id === parseInt(match.params.dishId,10))[0]} 

      return(
          <DishDetail 
          currentlyLoggedInDetail={this.state.currentlyLoggedIn}
              dish={this.state.dishes.filter((dish) => dish._id === match.params.dishId)[0]} 
              getAllDishes = {this.getAllDishes} 
            // comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
             />
      );
    };
    
    return (
      <div>
         
        <Header 
            getCurrentlyLoggedInUser={this.getCurrentlyLoggedInUser}
            currentlyLoggedIn={this.state.currentlyLoggedIn}
            serviceLogMeOut={this.authservice.logout}
            />
        {/* { this.state.ready && <div>{  JSON.stringify( this.state.dishes[0].comments) } </div>} */}
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} ready={this.state.ready} currentlyLoggedIn={this.state.currentlyLoggedIn}/>} />
            {/* <Route path='/menu/:dishId' component={DishWithId}  /> */}
            <Route path='/menu/:dishId' render={  (props)=>  <DishWithId {...props}  currentlyLoggedInId={this.state.currentlyLoggedIn}/> }  /> 
            <Route exact path='/contactus' component={Contact} />} />
            <Redirect to="/home" />
        </Switch>

        <Footer/>
      </div>
    );
  }
}

export default Main;