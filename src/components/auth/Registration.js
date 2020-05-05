import React, { Component } from 'react'
import axios from 'axios'
import Instruments from '../instruments/Instruments'

export default class Registration extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: '',
      userType: false,
      name: ' ',
      chosenInstruments: [],
      url: ''
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
    const { email, password, password_confirmation, url } = this.state
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
        'http://localhost:3001/users',
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            user_type: type,
            url: url
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleSuccessfulAuth(response.data);
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
          this.createUserInstruments(response.data);
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
        this.createUserInstruments(response.data);
        this.createResource(response.data)
        this.props.grabUserTypeData(response.data);
      })
      .catch(error => {
        console.log('registration error', error)
      })
    }
  }

  createUserInstruments = (user) => {
    console.log("CREATING USER INSTRUMENTS:::", user)
    if(user.user.user_type === 'INSTRUCTOR'){
      this.state.chosenInstruments.map((inst, idx)=>(
        axios.post('http://localhost:3001/user_instruments',
        {
          instrument: inst.id,
          instructor: user.id
        })
        .then(resp => console.log(resp))
      ))
    }
    else if(user.user.user_type === 'STUDENT'){
      this.state.chosenInstruments.map((inst, idx)=>(
        axios.post('http://localhost:3001/user_instruments',
        {
          instrument: inst.id,
          student: user.id
        })
        .then(resp => console.log(resp.data))
      ))
    }
  }

  createResource = (instructor) => {
    axios.post('http://localhost:3001/resources',
    {
      instructor: instructor.id
    })
  }

  handleChecked () {
    this.setState({
      userType: !(this.state.userType)
    })
    //false = student
    //true = instructor
  }

  grabInstruments = (instruments) => {
    this.setState({
      instruments: instruments
    })
  }

  addToChosenInstruments = instrument => {
    this.setState({
      chosenInstruments: [...this.state.chosenInstruments, instrument]
    })
    // (this.props.grabInstruments(this.state.chosenInstruments))
  }

  removeFromChosenInstruments = inst => {
    const intsrumentsOmitRemoved = this.state.chosenInstruments.filter(
      instrument => {
        return instrument.id !== inst.id
      }
    )
    this.setState({
      chosenInstruments: intsrumentsOmitRemoved
    })
    // this.props.grabInstruments(this.state.chosenInstruments)
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
          <input
            type='url'
            name='url'
            placeholder='Avatar URL'
            value={this.state.url}
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

        <Instruments addToChosenInstruments={this.addToChosenInstruments} removeFromChosenInstruments={this.removeFromChosenInstruments}/>
      </div>
    )
  }
}
