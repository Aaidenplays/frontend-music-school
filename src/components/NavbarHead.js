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
              src={this.props.userTypeData.avatarURL}
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
