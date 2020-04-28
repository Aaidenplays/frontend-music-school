import React, { Component } from 'react'
import axios from 'axios'

export class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loginErrors: '',
      // userType: false
    }
    // this.handleChecked = this.handleChecked.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    const { email, password } = this.state
    axios
      .post(
        'http://localhost:3001/sessions',
        {
          user: {
            email,
            password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data)
        }
      })
      .catch(error => {
        console.log('login error', error)
      })
    event.preventDefault()
    this.props.history.push('/dashboard')
  }

  // handleChecked () {
  //   this.setState({
  //     userType: !(this.state.userType)
  //   });
  //   //false = student
  //   //true = instructor
  // }

  render () {
    return (
      <div>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
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
          {/* <label className='switch centered-element'>
            <input type='checkbox' onChange={this.handleChecked} />
            <div className='slider'></div>
          <h3 className='toggle-label-right'>Student</h3>
            <h3 className='toggle-label-left'>Instructor</h3>
          </label> */}
          <button  type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default Login
