import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { withRouter, Redirect } from "react-router-dom";


export class AssignmentCard extends Component {
    constructor(){
        super() 

        this.state = {
            toViewAssignment: false
        }
    }

    handleView = () => {
        this.setState({
            toViewAssignment: true
        })
    }

  render () {
    return (
      <div>
      {this.state.toViewAssignment ? <Redirect to={{
          pathname: '/view-assignment',
          state: {assignment: this.props.assignment}
      }}/>:null}
        <Card style={{ width: '18rem' }}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Assignment</Card.Title>
            <Card.Text>
                {this.props.assignment.description}
            </Card.Text>
              <Button onClick={this.handleView} variant='primary'>
                view
              </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default withRouter(AssignmentCard)
