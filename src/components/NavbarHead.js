import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
// import {NavLink} from 'react-router-dom'
// import { Navbar } from 'react-bootstrap'
// import { Nav } from 'react-bootstrap'
// import { Form } from 'react-bootstrap'
// import { FormControl } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
// import { NavDropdown } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Registration from './auth/Registration'
import Login from './auth/Login'

export class NavbarHead extends Component {

  constructor (props) {
    super(props)

    // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  

  configureUserStatus(status){
    console.log('status:',status)
    if (status === 'LOGGED_IN'){
      return(
       <Nav className='ml-auto'>
        <NavLink onClick={() => this.handleLogoutClick()} className="nav-space d-inline p-2 bg-dark text-white"
        to="/logout">Sign Out</NavLink>
      </Nav>
      )
    }
    else if(status === 'NOT_LOGGED_IN'){
      return(
         <Nav className='ml-auto'>
          <NavLink className="nav-space d-inline p-2 bg-dark text-white"
          to="/signin">Sign In</NavLink>
          <NavLink className="nav-space d-inline p-2 bg-dark text-white"
          to="/signup">Register</NavLink>
        </Nav>
      )
    }
  }

  handleLogoutClick () {
    console.log("LOGGING OUT")
    axios
      .delete('http://localhost:3001/logout', { withCredentials: true })
      .then(response => {
        this.props.handleLogout()
      })
      .catch(error => {
        console.log('logout error', error)
      })
      // this.props.history.push('/signin')
  }

  render () {
    return (
      <Navbar className='color-nav' fixed="top" variant='dark' expand='lg'>
      <Navbar.Brand href='#home'>Online Music Academy</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='nav-space'>
            <NavLink className="nav-space d-inline p-2 bg-dark text-white"
            to="/assignments">Assignments</NavLink>
            <NavLink className="nav-space d-inline p-2 bg-dark text-white"
            to="/instructors">Instructors</NavLink>
            <NavLink className="nav-space d-inline p-2 bg-dark text-white"
            to="/videos">My Videos</NavLink>
          </Nav>
          {this.configureUserStatus(this.props.userStatus)}
        </Navbar.Collapse>
      </Navbar>

      //<div>

      // </div>

      // <div>
      //   <Navbar fixed='top' bg='dark' variant='dark' expand='lg'>
      //     <Navbar.Brand href='#home'>Online Music Academy</Navbar.Brand>
      //     <Navbar.Toggle aria-controls='basic-navbar-nav' />
      //     <Navbar.Collapse id='basic-navbar-nav'>
      //       <Nav className='mr-auto'>
      //         <Nav.Link href='#home'>Home</Nav.Link>
      //         <Nav.Link href='#link'>Link</Nav.Link>
      //         <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
      //           <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
      //           <NavDropdown.Item href='#action/3.2'>
      //             Another action
      //           </NavDropdown.Item>
      //           <NavDropdown.Item href='#action/3.3'>
      //             Something
      //           </NavDropdown.Item>
      //           <NavDropdown.Divider />
      //           <NavDropdown.Item href='#action/3.4'>
      //             Separated link
      //           </NavDropdown.Item>
      //         </NavDropdown>
      //       </Nav>
      //       <Form inline>
      //         <FormControl
      //           type='text'
      //           placeholder='Search'
      //           className='mr-sm-2'
      //         />
      //         <Button variant='outline-success'>Search</Button>
      //       </Form>
      //     </Navbar.Collapse>
      //   </Navbar>
      // </div>
    )
  }
}

// export default NavbarHead
