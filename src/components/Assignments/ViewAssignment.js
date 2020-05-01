import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ReactPlayer from 'react-player'


export class ViewAssignment extends Component {
    constructor(){
        super()

        this.state = {
            url: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            url: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/videos',
        {
            student: this.props.location.state.assignment.student_id,
            url: this.state.url
        }).then(resp => this.postVideoAssignment(resp.data))
    }

    postVideoAssignment = (data) => {
        axios.post('http://localhost:3001/video_assignments',
        {
            video: data.id,
            assignment: this.props.location.state.assignment.id
        }).then(resp => console.log('DATA:::',data,"VA:::", resp.data))
    }
  render () {
    return (
      <div>
        <h1>Assignment View</h1>
        {this.props.location.state.assignment
          ? console.log('ASSIGNMNT::', this.props.location.state.assignment)
          : null}
          <h2>{this.props.location.state.assignment.description}</h2>
        <Form>
        <Form.Group>
          <Form.Control size='sm' type='text' placeholder='Paste URL to your video here' onChange={this.handleChange}/>
        </Form.Group>
        <Button variant='primary' type='submit' onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
        {this.state.url !== '' ? 
        <ReactPlayer url={this.state.url} playing />
        :null}
      </div>
    )
  }
}

export default ViewAssignment
