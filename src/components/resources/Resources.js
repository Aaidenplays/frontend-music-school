import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router'

export class Resources extends Component {
    constructor(props){
        super(props)

        this.state={
            toAddResources: false
        }
    }

    handleClick = (event) => {
        this.setState({
            toAddResources: true
        })
    }

  render () {
    return (
        <div>
        {this.state.toAddResources ? <Redirect to={{
            pathname: '/add-resource',
            state: {user: this.props.userData}
        }}/>:null}
        <br />
        <br />
        <br />
        <h1>Resources</h1>
        <Button onClick={this.handleClick} variant='primary' size='lg'>
          Add Resources
        </Button>{' '}
      </div>
    )
  }
}

export default Resources
