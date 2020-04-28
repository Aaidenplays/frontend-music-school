import React, { Component } from 'react'
import axios from 'axios'

export default class Registration extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: '',
      userType: false,
      name: ' '
    }
    this.handleChecked = this.handleChecked.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    const { email, password, password_confirmation } = this.state
    let type;
    if(this.state.userType === true){
      type = 'STUDENT'
    }
    else if(this.state.userType===false){
      type = 'INSTRUCTOR'
    }
console.log("USERTYPE:::",type)
    axios
      .post(
        'http://localhost:3001/registrations',
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            user_type: type
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleSuccessfulAuth(response.data)
          this.handleUserType(response.data.user)
        }
      })
      .catch(error => {
        console.log('registration error', error)
      })
    event.preventDefault()
  }

  handleUserType (user) {
    console.log(user)
    const { name } = this.state

    if (this.state.userType) {
      axios
        .post(
          'http://localhost:3001/students',
          {
            name: name,
            user: user.id
          },
        )
        .then(response => {
          this.props.grabUserTypeData(response.data);
        })
        .catch(error => {
          console.log('registration error', error)
        })
    }
    else if(!this.state.userType){
      axios
      .post(
        'http://localhost:3001/instructors',
        {
          name: name,
          user: user.id
        },
      )
      .then(response => {
        this.props.grabUserTypeData(response.data);
      })
      .catch(error => {
        console.log('registration error', error)
      })
    }
  }

  handleChecked () {
    this.setState({
      userType: !(this.state.userType)
    })
    //false = student
    //true = instructor
  }

  render () {
    return (
      <div>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
        <input
            type='text'
            name='name'
            placeholder='Name'
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type='password'
            name='password_confirmation'
            placeholder='Password confirmation'
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <br />
          <label className='switch centered-element'>
            <input type='checkbox' onChange={this.handleChecked} />
            <div className='slider'></div>
            <h3 className='toggle-label-right'>Student</h3>
            <h3 className='toggle-label-left'>Instructor</h3>
          </label>
          <br />
          <button type='submit'>Register</button>
        </form>
      </div>
    )
  }
}
