import React, { Component } from 'react'
import axios from 'axios'

export class Instructors extends Component {
    constructor(props){
        super(props)

        this.state={
            instructors: []
        }
    }

    //render invites from instructors
    componentDidMount(){
        axios.get('http://localhost:3001/instructor_requests')
        .then(response => this.filterMyInstructors(response.data))
        .catch(error => {
            console.log('GET error: ', error)
        })
    }

    filterMyInstructors = (instructors) => {
        console.log(instructors)
        this.setInstructors(
            instructors.filter(instructor => {
                instructor.student_id === this.props.student.id
            })
        )
    }

    setInstructors = (instructors) => {
        this.setState({
            instructors: instructors
        })
        console.log('final step:',instructors)
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Instructors
