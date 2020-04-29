import React, { Component } from 'react'
import axios from 'axios'
import InstructorCard from './InstructorCard'

export class Instructors extends Component {
  constructor (props) {
    super(props)

    this.state = {
      instructors: [],
      myInstructors: [],
      status: 'NOT_STATED',
      student: {}
    }
  }

  //render invites from instructors
//   componentDidMount () {
//     console.log('mounting....')
//     console.log('PROPS STUDEnTS:::',this.props.student)
//     axios
//       .get('http://localhost:3001/instructor_requests')
//       .then(response => {
//           this.setInstructors(response.data)
//           this.filterMyInstructors(response.data)
//         })
//       .catch(error => {
//         console.log('GET error: ', error)
//       })
//   }

//   filterMyInstructors = instructors => {
//     console.log('made it!')
//     // if (this.props.student) {
//       console.log('Instructors::: ', instructors)
//     //   const filteredInstructors = 
//       this.setMyInstructors(
//         instructors.filter(instructor => {
//           console.log('STUDENT:', this.props.student)
//           // console.log(instructor.student_id)
//           instructor.student_id === this.props.student.id
//         })
//       )
//       // if(this.state.instructors != filteredInstructors){
//       // this.setInstructors(filteredInstructors)
//     //   }
//     // }
//   }

//   setInstructors = instructors => {
//     this.setState({
//       instructors: instructors
//     })
//   }

//   setMyInstructors = instructors => {
//     this.setState({
//       myInstructors: instructors
//     })
//   }

//   simpleRenderConditional = () => {
//     if (this.state.instructors.length > 1) {
//       this.filterMyInstructors(this.state.instructors)
//     }
//   }

  componentDidMount(){

}

componentDidUpdate(){
    console.log('made it!!!')
    if(this.props.student.student && this.state.status !== 'STATED'){
    this.setState({
        student: this.props.student.student,
        status: 'STATED'
    })
    }
  }

   /*render all instructor requests*/
  renderInstructorRequests = (requests) => {
      if(requests){
          return requests.map((request, idx) => {
              return <InstructorCard key={idx} request={request} instructor={this.state.student.instructor_requests[idx].instructor}/>
          })
      }
  }

  render () {
    return (
    <div>
        {this.renderInstructorRequests(this.state.student.instructor_requests)}
        {console.log('RENDER', this.props.student)}
    </div>
    )
  }
}

export default Instructors
