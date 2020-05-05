import React, { Component } from 'react'
import axios from 'axios'
import InstrumentCard from './InstrumentCard'
import Grid from 'semantic-ui-react'
import { Card as CardS } from 'semantic-ui-react'

export class Instruments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      instruments: [],
    //   chosenInstruments: []
    }
  }

  componentDidMount () {
    axios
      .get('http://localhost:3001/instruments')
      .then(resp => this.setInstruments(resp.data))
  }


  setInstruments = instruments => {
    this.setState({
      instruments: instruments
    })
  }

//   addToChosenInstruments = instrument => {
//     this.setState({
//       chosenInstruments: [...this.state.chosenInstruments, instrument]
//     })
//     (this.props.grabInstruments(this.state.chosenInstruments))
//   }

//   removeFromChosenInstruments = inst => {
//     const intsrumentsOmitRemoved = this.state.chosenInstruments.filter(
//       instrument => {
//         return instrument.id !== inst.id
//       }
//     )
//     this.setState({
//       chosenInstruments: intsrumentsOmitRemoved
//     })
//     this.props.grabInstruments(this.state.chosenInstruments)
//   }

  renderInstrumentCards = instruments => {
    return instruments.map((instrument, idx) => (
      <InstrumentCard
        key={idx}
        instrument={instrument}
        removeInstrument={this.props.removeFromChosenInstruments}
        addInstrument={this.props.addToChosenInstruments}
      />
    ))
  }
  render () {
    return (
      <div>
        {this.renderInstrumentCards(this.state.instruments)}
      </div>
    )
  }
}

export default Instruments
