import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Registration from './auth/Registration'
import Students from './students/Students'
import ViewAssignment from './Assignments/ViewAssignment'

import Home from './Home'
import Dashboard from './Dashboard'
import { NavbarHead } from './NavbarHead'
import { Redirect } from 'react-router-dom'

import Login from './auth/Login'
import Instructors from './instructors/Instructors'
import DeployAssignment from './students/DeployAssignment'
import Assignments from './Assignments/Assignments'
import Video from './videos/Video'
import DeployedAssignments from './Assignments/DeployedAssignments'
import ViewAssignmentAsInstructor from './Assignments/ViewAssignmentAsInstructor'

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
      userTypeData: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth (data) {
    const { history } = this.props
    this.handleLogin(data)
    // this.props.history.push('/dashboard')
    // return <Redirect to='/dashboard'/>
  }

  checkLoginStatus () {
    axios
      .get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === 'NOT_LOGGED_IN'
        ) {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user
          }),
            this.getUserData(response.data.user.id)
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === 'LOGGED_IN')
        ) {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {}
          }),
            this.getUserData(response.data.user.id)
        }
      })
      .catch(error => {
        console.log('check login error', error)
      })
  }

  componentDidMount () {
    this.checkLoginStatus()
  }

  handleLogout () {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    })
  }

  getUserData = id => {
    console.log('made it:::', id)
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then(response => this.grabUserTypeData(response.data))
  }

  handleLogin (data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    }),
      console.log('USER:::', data.user)
    this.getUserData(data.user.id)
  }

  //grab userTypes data
  //for login
  findUserTypeData = user => {
    console.log()
    console.log('HELLO!', this.state.user.user_type)
    if (this.state.user.user_type === 'STUDENT') {
      axios
        .get('http://localhost:3001/students')
        .then(response => this.findMe(response.data))
    }
    if (this.state.user.user_type === 'INSTRUCTOR') {
      axios
        .get('http://localhost:3001/instructors')
        .then(response => this.findMe(response.data))
    }
  }

  //findUserDataType
  findMe = data => {
    this.grabUserTypeData(data.find(el => this.state.user.id === el.user_id))
  }

  //for register
  grabUserTypeData = data => {
    this.setState({
      userTypeData: data
    })
    console.log('success!: ', data)
  }

  render () {
    return (
      <div className='app'>
        <div>
          <NavbarHead
            userType={this.state.user.user_type}
            handleLogout={this.handleLogout}
            userStatus={this.state.loggedInStatus}
          />
        </div>
        {/* handling route destinations */}
        {/* {cosole.log(this.state.user.user_type)} */}
        <div>
        <BrowserRouter />
        <div>
          <Switch>
            <Route
              // exact
              path='/dashboard'
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              // exact
              path='/signin'
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
              )}
            />
            <Route
              // exact
              path={'/register'}
              render={props => (
                <Registration
                  {...props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  grabUserTypeData={this.grabUserTypeData}
                />
              )}
            />
            <Route
              exact
              path={'/assignments'}
              render={props => (
                <Assignments {...props} student={this.state.userTypeData} />
              )}
            />
            <Route
              exact
              path={'/instructors'}
              render={props => (
                <Instructors
                  {...props}
                  user={this.state.user}
                  student={this.state.userTypeData}
                />
              )}
            />
            <Route
              exact
              path={'/videos'}
              render={props => (
                <Video {...props} userData={this.state.userTypeData} />
              )}
            />
            <Route
              exact
              path={'/students'}
              render={props => (
                <Students {...props} instructor={this.state.userTypeData} />
              )}
            />
            <Route
              exact
              path={'/view-assignment'}
              render={props => <ViewAssignment {...props} />}
            />
            <Route
              exact
              path={'/resources'}
              render={props => (
                <Registration
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={'/deploy-assignments'}
              render={props => (
                <DeployAssignment
                  {...props}
                  student={this.props.student}
                  instructor={this.props.instructor}
                />
              )}
            />
            <Route
              exact
              path={'/deployed-assignments'}
              render={props => (
                <DeployedAssignments
                  {...props}
                  instructor={this.state.userTypeData}
                />
              )}
            />
            <Route
              exact
              path={'/view-assignment-as-instructor'}
              render={props => (
                <ViewAssignmentAsInstructor
                  {...props}

                />
              )}
            />
            <Route
              exact
              path={'/'}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
          </div>
        </div>
      </div>
    )
  }
}
