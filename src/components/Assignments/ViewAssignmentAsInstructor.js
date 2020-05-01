import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ReactPlayer from 'react-player'

export class ViewAssignmentAsInstructor extends Component {
    constructor(){
        super()

        this.state={
            feedback: ''
        }
    }
  renderVideo = videos => {
      console.log('videos:::', videos)
    const video = videos.find(el => {
      return el.student_id !== undefined
    })
    // console.log('VIDEO:::',video)
    return <ReactPlayer url={video.url} playing />
  }
  renderInfo = assignment => {
    return <h3>{assignment.description}</h3>
  }

  handleChange = (event) => {
      this.setState({
          feedback: event.target.value
      })
  }
  
  handleSubmit = (event) => {
    
    event.preventDefault();
    axios.patch(`http://localhost:3001/assignments/${this.props.location.state.assignment.id}`,
    {
        status: 'completed',
        feedback: this.state.feedback
    })
    .then(resp => console.log(resp.data))
  }

  render () {
    return (
      <div>
        <h1>Assignment View</h1>
        {this.props.location.state.assignment
          ? this.renderInfo(this.props.location.state.assignment)
          : null}
        {this.props.location.state.assignment
          ? this.renderVideo(this.props.location.state.assignment.videos)
          : null}
        <Form>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <h2>Feedback:</h2>
            <Form.Control onChange={this.handleChange} as='textarea' rows='3' />
          </Form.Group>
          <Button onClick={this.handleSubmit} variant='primary' type='submit'>
            Post Feedback
          </Button>
        </Form>
      </div>
    )
  }
}

export default ViewAssignmentAsInstructor
