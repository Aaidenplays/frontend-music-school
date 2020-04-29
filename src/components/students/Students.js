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
  renderAllStudentCards = (students) => {
      console.log("instructor-prop: ", this.props.instructor.id)
    return students.map((student, idx) => { 
          return <div key={idx}>
             <StudentCard student={student} instructor={this.props.instructor} />
          </div>
  })
  }

//   filterYourStudents = (students) => {
//     let acceptedRequests
//      students.map((student, idx) => { 
//         key={idx}
//         acceptedRequests = (student.instructor_requests.filter(request => {
//             request.status === 'accepted', request.instructor_id === this.props.instructor.id
//         }))
//     },
//     this.renderYourStudentCards(acceptedRequests)
// }

    renderYourStudentCards = () => {
        acceptedRequests.map((student,idx) => {
            return <div key={idx}>
            <StudentCard student={student} instructor={this.props.instructor} />
            </div>
    })     
  }

  render () {
    return (
    <div>
    {/* {this.renderAllStudents()} */}
    <div>
        <h1>Your Students</h1>
        {/* this.renderYourStudents(this.state.students) */}
    </div>
    <div>
        <h1>Pending Requests</h1>
    </div>
    <div> 
    <h1>All Students</h1>
    {this.renderAllStudentCards(this.state.students)}
    </div>
    </div>
    )
  }
}

export default Students
