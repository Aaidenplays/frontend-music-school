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
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'
import { Redirect } from "react-router-dom";


export class NavbarHead extends Component {
  constructor (props) {
    super(props)

    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSelect=(event)=>{
    switch (event){
      case 'logout':
        this.handleLogoutClick()
        break;
    }
    return <Redirect to='/logout'/>
  }

  configureUserStatus (status) {
    console.log('status:', status)
    if (status === 'LOGGED_IN') {
      return (
        <Nav className='ml-auto'>
        <Dropdown>
          <Dropdown.Toggle variant='secondary' id="dropdown-basic">
            <Image
              className='image'
              src='data:image/jpeg;base64,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'
              roundedCircle
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onSelect={(e) => this.handleSelect(e)} eventKey='logout' variant='primary'>
            Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Nav>
      )
    } else if (status === 'NOT_LOGGED_IN') {
      return (
        <Nav className='ml-auto'>
          <NavLink
            className='nav-space d-inline p-2 bg-dark text-white'
            to='/signin'
          >
            Sign In
          </NavLink>
          <NavLink
            className='nav-space d-inline p-2 bg-dark text-white'
            to='/register'
          >
            Register
          </NavLink>
        </Nav>
      )
    }
  }

  handleLogoutClick () {
    console.log('LOGGING OUT')
    axios
      .delete('http://localhost:3001/logout', { withCredentials: true })
      .then(response => {
        this.props.handleLogout()
      })
      .catch(error => {
        console.log('logout error', error)
      })
  }

  handleUserTypeRendering () {
    if (this.props.userType === 'INSTRUCTOR') {
      return (
        <Nav className='nav-space'>
          <NavLink
            className='nav-space d-inline p-2 bg-dark text-white'
            to='/students'
          >
            Students
          </NavLink>
          <NavLink
            className='nav-space d-inline p-2 bg-dark text-white'
            to='/deployed-assignments'
          >
            Deployed Assignments
          </NavLink>
          <NavLink
            className='nav-space d-inline p-2 bg-dark text-white'
            to='/resources'
          >
            Resources
          </NavLink>
        </Nav>
      )
    } else if (this.props.userType === 'STUDENT') {
      return (
        <Nav className='nav-space'>
          <NavLink
            className='nav-space d-inline p-2 bg-dark text-white'
            to='/assignments'
          >
            Assignments
          </NavLink>
          <NavLink
            className='nav-space d-inline p-2 bg-dark text-white'
            to='/instructors'
          >
            Instructors
          </NavLink>
          <NavLink
            className='nav-space d-inline p-2 bg-dark text-white'
            to='/videos'
          >
            My Videos
          </NavLink>
        </Nav>
      )
    } else {
      return <div></div>
    }
  }

  render () {
    return (
      <Navbar className='color-nav' fixed='top' variant='dark' expand='lg'>
        <Navbar.Brand href='/'>Online Music Academy</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {this.handleUserTypeRendering()}
          {this.configureUserStatus(this.props.userStatus)}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

// export default NavbarHead
