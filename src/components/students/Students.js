import React, { Component } from 'react'
import axios from 'axios'
import StudentCard from './StudentCard'

export class Students extends Component {
    constructor(props){
        super(props)

        this.state={
            students: [],
            myStudents: [],
            instructor: {},
            status: 'NOT_STATED',
            pendingRequests: []
        }
    }

  /* render all students*/
  componentDidMount = () => {
    axios
      .get('http://localhost:3001/students')
      .then(response => this.setStudents(response.data))
  }

  componentDidUpdate() {
      if(this.props.instructor.instructor && this.state.status !== 'STATED'){
          this.setState({
              instructor: this.props.instructor.instructor,
              status: 'STATED'
          })
          this.setPendingRequests(this.props.instructor.instructor.instructor_requests)
      }
  }

  setPendingRequests = (requests) => {
    const filteredRequests = requests.filter(request => {
        return request.status === 'pending'
    })
    this.setState({
        pendingRequests: filteredRequests
    })
    this.setMyStudents(requests)
  }

  setMyStudents = (requests) => {
    const filteredRequests = requests.filter(request => {
        return request.status === 'accepted'
   })
   this.setState({
    myStudents: filteredRequests
})
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

  renderMyStudents = (students) => {
    return students.map((student, idx) => { 
        return <div key={idx}>
           <StudentCard student={student} instructor={this.props.instructor} status={true} history={this.props.history}/>
        </div>
  })
}


//     renderYourStudentCards = () => {
//         acceptedRequests.map((student,idx) => {
//             return <div key={idx}>
//             <StudentCard student={student} instructor={this.props.instructor} />
//             </div>
//     })     
//   }

  render () {
    return (
    <div>
    {/* {this.renderAllStudents()} */}
    <div>
        <h1>Your Students</h1>
        {this.renderMyStudents(this.state.myStudents)}
    </div>
    <div>
        <h1>Pending Requests</h1>
        {this.renderMyStudents(this.state.pendingRequests)}
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
