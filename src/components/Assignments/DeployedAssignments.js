import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Submitted from './Submitted'
import { AssignmentCard } from './AssignmentCard'

export class DeployedAssignments extends Component {
  constructor () {
    super()
    this.state = {
      selected: '/submitted',
      submittedAssigments: [],
      pendingAssigments: [],
      completedAssigments: [],
      filtered: false
    }
  }

  handleSelect = event => {
    console.log(event)
    this.setState({
      selected: `${event}`
    })
  }

  renderSelectedTab = selected => {
    switch (selected) {
      case '/submitted':
        return (
          (<h1>submitted</h1>),
          this.state.submittedAssigments.map((assignment, idx) => {
            return (
              <AssignmentCard
                key={idx}
                assignment={assignment}
                fromInstructor={true}
              />
            )
          })
        )
      case '/pending':
        return (
          (<h1>pending</h1>),
          this.state.pendingAssigments.map((assignment, idx) => {
            return (
              <AssignmentCard
                key={idx}
                assignment={assignment}
                fromInstructor={true}
              />
            )
          })
        )
      case '/completed':
        return (
          (<h1>completed</h1>),
          this.state.completedAssigments.map((assignment, idx) => {
            return (
              <AssignmentCard
                key={idx}
                assignment={assignment}
                fromInstructor={true}
              />
            )
          })
        )
    }
  }

  componentDidUpdate () {
    if (this.props.instructor.instructor && !this.state.filtered) {
      this.filterAssignments(this.props.instructor.instructor.assignments)
    }
  }

  filterAssignments = assignments => {
    let submittedAssigments = []
    let pendingAssigments = []
    let completedAssigments = []

    assignments.map((assignment, idx) => {
      console.log(assignment)
      switch (assignment.status) {
        case 'completed':
          completedAssigments.push(assignment)
          break
        case 'submitted':
          submittedAssigments.push(assignment)
          break
        case 'pending':
          pendingAssigments.push(assignment)
          break
      }
    })
    this.setState({
      completedAssigments: completedAssigments,
      submittedAssigments: submittedAssigments,
      pendingAssigments: pendingAssigments,
      filtered: true
    })
  }

  render () {
    return (
      <div>
        <div>
          {/* {this.props.instructor.instructor && !this.state.filtered ? this.filterAssignments(this.props.instructor.instructor.assignments):null} */}
          <h1>Deployed Assignments</h1>
          <Nav
            variant='tabs'
            defaultActiveKey='/submitted'
            onSelect={this.handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey='/submitted'>Submitted</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='/pending'>Pending</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='/completed'>Completed</Nav.Link>
            </Nav.Item>
          </Nav>
          {this.renderSelectedTab(this.state.selected)}
        </div>

        {/* <div>
        <BrowserRouter />
        <Switch>
        <Route
              exact
              path={'/submitted'}
              render={props => (
                <Submitted
                  {...props}
                />
              )}
            />
        </Switch>
        </div> */}
      </div>
    )
  }
}

export default DeployedAssignments