import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import {Card as CardS } from 'semantic-ui-react'

export class InstrumentCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            class: 'instrument-image-size',
            clicked: false
        }
    }

    handleClicked = () => {
        this.setState({
            clicked: !this.state.clicked
        })
        this.setClass(this.state.clicked)
    }
    
    setClass = (clicked) => {
        if (clicked === true){
            this.setState({
                class: 'instrument-image-size'
            })
            this.props.removeInstrument(this.props.instrument)
        }
            else{
                this.setState({
                    class: 'card-clicked'
                })
                this.props.addInstrument(this.props.instrument)           
            }  
    }

  render () {
    return (
      <div className='instrument-card-size' onClick={this.handleClicked} >
        <Card  className='bg-dark text-black instrument-card-size'>
          <Card.Img className={this.state.class} src={this.props.instrument.url} alt='Card image' />
          <Card.ImgOverlay>
          <h1 className='bg-dark'>{this.props.instrument.name}</h1>
            {/* <Card.Title>{this.props.instrument.name}</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
            <Card.Text>Last updated 3 mins ago</Card.Text> */}
          </Card.ImgOverlay>
        </Card>
      </div>
    )
  }
}

export default InstrumentCard
