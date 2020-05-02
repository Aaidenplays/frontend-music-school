import React, { Component } from 'react'
import axios from 'axios'
import StudentCard from './StudentCard'
import Nav from 'react-bootstrap/Nav'


export class Students extends Component {
    constructor(props){
        super(props)

        this.state={
            students: [],
            myStudents: [],
            instructor: {},
            status: 'NOT_STATED',
            pendingRequests: [],
            selected: 'my-students'
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

  removeStudent = (student) => {
    const studentsOmitRemoved= this.state.myStudents.filter(stud => {
        return stud.student.id !== student.student.id
    })
    this.setState({
        myStudents: studentsOmitRemoved
    })
  }

  inviteSent = (student) => {
      this.setState({
          pendingRequests: [...this.state.pendingRequests, student]
      })
  }

  removePendingStudent = (student) => {
    const studentsOmitRemoved= this.state.pendingRequests.filter(stud => {
        return stud.id !== student.id
    })
    this.setState({
        pendingRequests: studentsOmitRemoved
    })
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
             <StudentCard inviteSent={this.inviteSent} student={student} instructor={this.props.instructor}/>
          </div>
  })
  }

  renderMyStudents = (students) => {
    return students.map((student, idx) => { 
        return <div key={idx}>
           <StudentCard remove={this.removeStudent} student={student} instructor={this.props.instructor} status={true} history={this.props.history}/>
        </div>
  })
}

renderPendingStudents = (students) => {
    return students.map((student, idx) => { 
        return <div key={idx}>
           <StudentCard cancel={this.removePendingStudent} student={student} instructor={this.props.instructor} pendingStatus={true} history={this.props.history}/>
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

    handleSelect = (event) => {
        this.setState({
            selected: `${event}`
        })
    }

    renderSelectedTab = (selected) => {
        switch (selected){
            case 'my-students': 
               return this.renderMyStudents(this.state.myStudents)
            case 'pending-requests':
                return this.renderPendingStudents(this.state.pendingRequests)
            case 'all-students':
                return this.renderAllStudentCards(this.state.students)
        }
    }

  render () {
    return (
    <div><br/>
    {/* {this.renderAllStudents()} */}
    <Nav
            variant='tabs'
            defaultActiveKey='/submitted'
            onSelect={this.handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey='my-students'>My Students</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='pending-requests'>Pending Requests</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='all-students'>All Students</Nav.Link>
            </Nav.Item>
          </Nav>
          <div>
              {this.renderSelectedTab(this.state.selected)}
          </div>
    {/* <div>
        <h1>Your Students</h1>
        {this.renderMyStudents(this.state.myStudents)}
    </div>
    <div>
        <h1>Pending Requests</h1>
        {this.renderPendingStudents(this.state.pendingRequests)}
    </div>
    <div> 
    <h1>All Students</h1>
    {this.renderAllStudentCards(this.state.students)}
    </div> */}
    </div>
    )
  }
}

export default Students
