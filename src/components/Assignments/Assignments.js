import React, { Component } from 'react'
import AssignmentCard from './AssignmentCard'

export class Assignments extends Component {

    renderPendingAssignments = (assignments) => {
        return assignments.map((assignment,idx)=>{
            return <AssignmentCard key={idx} assignment={assignment}/>
        })
    }

  render () {
    return (
      <div>
        <h1>My Assignments</h1>
        {this.props.student.student ? this.renderPendingAssignments(this.props.student.student.assignments) : null}
      </div>
    )
  }
}

export default Assignments
