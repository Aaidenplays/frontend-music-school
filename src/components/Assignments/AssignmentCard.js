import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { withRouter, Redirect } from "react-router-dom";
import ViewAssignment from './ViewAssignment';
import ViewAssignmentAsInstructor from './ViewAssignmentAsInstructor';


export class AssignmentCard extends Component {
    constructor(){
        super() 

        this.state = {
            toViewAssignment: false,
            toViewAssignmentAsInstructor: false
        }
    }

    handleView = () => {
        this.setState({
            toViewAssignment: true
        })
    }

    renderInstructorButton = () => {
        return <Button onClick={this.handleInstructorButtonClick} variant='primary'>Provide Feedback</Button>
    }
    
    handleInstructorButtonClick = (event) => {
        // return <ViewAssignmentAsInstructor fromInstructor={this.props.fromInstructor} />
        //pass props assignment
        this.setState({
            toViewAssignmentAsInstructor: true
        })
    }

  render () {
    return (
      <div>
      {this.state.toViewAssignmentAsInstructor ? <Redirect to={{
          pathname: '/view-assignment-as-instructor',
          state: {assignment: this.props.assignment}
      }}/>:null}
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
      {this.props.fromInstructor ? this.renderInstructorButton(this.props.assignment) : <Button onClick={this.handleView} variant='primary'>
                view
              </Button>}

          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default withRouter(AssignmentCard)
