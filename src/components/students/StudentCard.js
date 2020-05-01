import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import DeployAssignment from './DeployAssignment'
// import {withRouter} from 'react-router-dom'
import { withRouter, Redirect } from "react-router-dom";


export class StudentCard extends Component {
  //handle invite btn
  constructor(){
      super()

      this.state={
          toDeployStudents: false
      }
  }

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

  handleDelete = () => {
    axios.delete(`http://localhost:3001/instructor_requests/${this.props.student.id}`)
    .then(resp => console.log(resp))
  }

  handleDeployAssignmentClick = () => {
    //   return <DeployAssignment />
    // <Link to = {{
    //     pathname: '/deploy-assignments',
    //     state: {
    //         list: this.props
    //     }
    // }} />
    // return <Redirect to='/deploy-assignments'/>
    //   this.props.history.push('/deploy-assignments')
    this.setState({
        toDeployStudents: true
    })
  }

  render () {
    return (
      <div>
      {this.state.toDeployStudents ? <Redirect to={{
      pathname: '/deploy-assignments',
      state: {student: this.props.student,
              instructor: this.props.instructor}
      }}/>
       : null}
        <Card style={{ width: '18rem' }}>
          <Card.Img variant='top' src='holder.js/100px180' />
          <Card.Body>
            <Card.Title>{this.props.student.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            {this.props.status ? 
                <Button onClick={this.handleDeployAssignmentClick} variant='primary'>
              Deploy Assignment
            </Button>            :
            <Button onClick={this.handleInv} variant='primary'>
              Invite To Your Classroom
            </Button>}
            {this.props.status ? 
                <Button onClick={this.handleDelete} variant='primary'>
              Remove
            </Button> : null}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default withRouter(StudentCard)
