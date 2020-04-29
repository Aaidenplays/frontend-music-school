import React, { Component } from 'react'
import axios from 'axios'
import StudentCard from './StudentCard'

export class Students extends Component {
    constructor(props){
        super(props)

        this.state={
            students: []
        }
    }

  /* render all students*/
  componentDidMount = () => {
    axios
      .get('http://localhost:3001/students')
      .then(response => this.setStudents(response.data))
  }

  setStudents = (students) => {
      this.setState({
          students: students
      })
      console.log(this.state.students)
  }

  //render student cards
  renderStudentCards = (students) => {
      console.log("instructor-prop: ", this.props.instructor.id)
    return students.map((student, idx) => { 
          return <div key={idx}>
             <StudentCard student={student} instructor={this.props.instructor} />
          </div>
  })
  }

  render () {
    return (
    <div>
    {/* {this.renderAllStudents()} */}
    {this.renderStudentCards(this.state.students)}
    </div>
    )
  }
}

export default Students
