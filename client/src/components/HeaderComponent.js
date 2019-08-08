import React from 'react';

import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';

import { NavLink } from 'react-router-dom';
import AuthService from '../services/AuthService';

class Header extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalSignUpOpen: false,
        };
        
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.service = new AuthService();
      }

      handleLogin(event) {
          event.preventDefault();
        
        this.service.login(this.username.value, this.password.value )
        .then(()=>{
            this.toggleModal();
            // alert("Username: " + this.username.value + " Password: " + this.password.value
            // + " Remember: " + this.remember.checked);
            this.props.getCurrentlyLoggedInUser();
        })
        .catch(err=>console.log(err))

          
    }

    handleSignUp = (event)=> {
        event.preventDefault();
        this.service.signup(this.username.value, this.password.value)
        .then((respond)=>{
            this.toggleModalSignup();
            // alert("from signup Username: " + this.username.value + " Password: " + this.password.value);
            this.props.getCurrentlyLoggedInUser();
        })
        .catch(err=>console.log(err))
        //
        
    }

    

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      
      toggleModalSignup = ()=>{
        this.setState({
            isModalSignUpOpen: !this.state.isModalSignUpOpen
          });
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

      headerlogout = ()=>{
          this.props.serviceLogMeOut()
          .then((respond)=>{
            console.log("header logout " + JSON.stringify(respond));
            this.props.getCurrentlyLoggedInUser();
          })
          .catch(err=>{console.log(err)})
      }

      render() {
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/bandera.png' height="30" width="41" alt='Denika Restaurant' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                            {!this.props.currentlyLoggedIn && <NavItem>
                                    <Button outline onClick={this.toggleModalSignup}><span className="fa fas fa-user-plus"></span> SignUp</Button>
                                </NavItem> }
                            {!this.props.currentlyLoggedIn && <NavItem className="ml-1">
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem> }
                                {this.props.currentlyLoggedIn && <NavItem className="ml-1">
                                    <Button outline onClick={this.headerlogout}><span className="fa fa-sign-out"></span> LogOut</Button>
                                </NavItem>}
                            </Nav>
                        </Collapse>

                        
                    </div>

                        

                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Restaurante Denika</h1>
                                <p>Denika is the sort of place you find through the recommendation of a friend  — a friend who happens to know a thing or two about good Nicaraguan cuisine. At Denika, the jugos are fresh, the carne asada is juicy, and the portions are large enough to share between a few people.!</p>
                            </div>
                            <div className="col-12 col-sm-6">
                            <img src="assets/images/bandera.png" className="img-fluid" alt=""/> 
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>

                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username"
                            innerRef={(input) => this.username = input} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password"
                            innerRef={(input) => this.password = input}  />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="remember"
                            innerRef={(input) => this.remember = input}  />
                            Remember me
                        </Label>
                    </FormGroup>
                    <Button type="submit" value="submit" color="primary">Login</Button>
                </Form>

                </ModalBody>
                </Modal>

                {/* start modal signup */}
                <Modal isOpen={this.state.isModalSignUpOpen} toggle={this.toggleModalSignup}>
                <ModalHeader toggle={this.toggleModalSignup}>SIGN UP</ModalHeader>
                <ModalBody>

                <Form onSubmit={this.handleSignUp}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username"
                            innerRef={(input) => this.username = input} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password"
                            innerRef={(input) => this.password = input}  />
                    </FormGroup>
                    
                    <Button type="submit" value="submit" color="primary">Sign Up</Button>
                </Form>

                </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default Header;