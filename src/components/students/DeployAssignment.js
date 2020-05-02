import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'


export class DeployAssignment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      description: ' '
    }
  }

  handleChange = event => {
    this.setState({
      description: event.target.value
    })
  }

  handleSubmit = () => {
      event.preventDefault();
    axios.post('http://localhost:3001/assignments',
    {
        student: this.props.location.state.student.student.id,
        instructor: this.props.location.state.student.instructor.id,
        description: this.state.description,
        status: 'pending'
    }).then(resp => window.alert('Assignment Deployed'))
  }

  render () {
    return (
      <div>
        <br />
        <h1>Deploy Assignment</h1>
        <Form>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            {/* <Form.Label>Example textarea</Form.Label> */}
            <h3>Description:</h3>
            <Form.Control as='textarea' rows='3' onChange={this.handleChange} />
            >
          </Form.Group>
          <Button variant='primary' type='submit' onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
        {console.log(this.props.location)}
        <h1>{this.props.location.state.student.id}</h1>
      </div>
    )
  }
}

export default DeployAssignment
