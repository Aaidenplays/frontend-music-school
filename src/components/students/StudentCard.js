import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export class StudentCard extends Component {
  //handle invite btn

  handleInv = event => {
    console.log('EVENT:::', this.props.student.id)
    axios
      .post('http://localhost:3001/instructor_requests', 
      {
        instructor: this.props.instructor.instructor.id,
        student: this.props.student.id,
        status: 'pending'
      })
      .then(response => console.log('RESPONSE:::', response.data))
      .catch(error => {
        console.log('registration error', error)
      })
  }

  render () {
    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant='top' src='holder.js/100px180' />
          <Card.Body>
            <Card.Title>{this.props.student.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button onClick={this.handleInv} variant='primary'>
              Invite To Your Classroom
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default StudentCard
