import React, { Component } from 'react'
import axios from 'axios'
import InstructorCard from './InstructorCard'
import Nav from 'react-bootstrap/Nav'


export class Instructors extends Component {
  constructor (props) {
    super(props)

    this.state = {
      instructors: [],
      status: 'NOT_STATED',
      student: {},
      pendingRequests: [],
      selected: 'my-instructors'
    }
  }

componentDidUpdate(){
    console.log('made it!!!')
    if(this.props.student.student && this.state.status !== 'STATED'){
    this.setState({
        student: this.props.student.student,
        status: 'STATED'
    })
    this.setPendingRequests(this.props.student.student.instructor_requests)
    }
  }

   /*render all instructor requests*/
  renderInstructorRequests = (requests) => {
      if(requests){
          return requests.map((request, idx) => {
              return <InstructorCard key={idx} accept={this.handleAccept} change={this.handleChange} request={request} instructor={this.state.student.instructor_requests[idx].instructor}/>
          })
      }
  }

  renderInstructors = (requests) => {
      if (requests){
          return requests.map((request,idx)=> {
              return <InstructorCard key={idx} delete={this.handleDelete} change={this.handleChange}  status={true} request={request} instructor={request.instructor}/>
          })
      }
  }

  setPendingRequests = (requests) => {
      console.log('setPendingRequests status: ACCESSED: ', requests[0].status)
    const filteredRequests = requests.filter(request => {
        return request.status === 'pending'
    })
    console.log(filteredRequests)
    this.setState({
        pendingRequests: filteredRequests
    })
    this.setInstructors(requests)
  }

  setInstructors = (requests) => {
    const filteredRequests = requests.filter(request => {
         return request.status === 'accepted'
    })
    console.log('setInstructors status: ACCESSED:',filteredRequests)
    this.setState({
        instructors: filteredRequests
    })
  }

    handleChange = () => {
        this.setState({
            status: 'NOT_STATED'
        })
        console.log('HANDLING CHANGES...', this.state.status)
    }

    handleAccept = (instructor) => {
        //should be pending requests
        const instructorsOmitAccepted = this.state.pendingRequests.filter(inst => {
           return inst.instructor.id !== instructor.instructor.id
        })
        this.setState({
            instructors: [...this.state.instructors, instructor],
            pendingRequests: instructorsOmitAccepted
        })
    }

    handleDelete = (instructor) => {
        const instructorsOmitDeleted = this.state.instructors.filter(inst => {
            return inst.instructor.id !== instructor.instructor.id
         })
         this.setState({
             instructors: instructorsOmitDeleted
         })
    }

    handleSelect = (event) => {
        this.setState({
            selected: `${event}`
        })
    }

    renderSelectedTab = (selected) => {
        switch(selected){
            case 'my-instructors':
                return this.renderInstructors(this.state.instructors)
            case 'pending-requests':
                return this.renderInstructorRequests(this.state.pendingRequests)
        }
    }

  render () {
    return (
    <div><br/><br/><br/>
        {/* <div> */}
        <Nav
            variant='tabs'
            defaultActiveKey='/submitted'
            onSelect={this.handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey='my-instructors'>My Instructors</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='pending-requests'>Pending Requests</Nav.Link>
            </Nav.Item>
          </Nav>
          {this.renderSelectedTab(this.state.selected)}

            {/* <h1>My Instructors</h1>
            {this.renderInstructors(this.state.instructors)}
        </div>
        <div>

        </div>
        <h1>Pending Instructor Requests</h1>
        {this.renderInstructorRequests(this.state.pendingRequests)}
        {console.log('RENDER', this.props.student)} */}
    </div>
    )
  }
}

export default Instructors
