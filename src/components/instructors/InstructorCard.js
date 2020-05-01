import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export class InstructorCard extends Component {

    handleAccept = () => {
        axios.patch(`http://localhost:3001/instructor_requests/${this.props.request.id}`,
        {
            status: 'accepted'
        })
        .then(resp => this.props.change());

    }

    handleDelete = () => {
        axios.delete(`http://localhost:3001/instructor_requests/${this.props.request.id}`)
        .then(resp => this.props.change())
    }

  render () {
    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant='top' src='holder.js/100px180' />
          <Card.Body>
            <Card.Title>{this.props.request.instructor.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            {this.props.status ?  <Button onClick={this.handleDelete} variant='primary'>
              Delete
            </Button>
            :<Button onClick={this.handleAccept} variant='primary'>
              Accept
            </Button>}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default InstructorCard
