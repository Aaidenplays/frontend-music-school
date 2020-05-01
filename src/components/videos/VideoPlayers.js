import React, { Component } from 'react'
import ReactPlayer from 'react-player'


export class VideoPlayers extends Component {
    render() {
        return (
            <div>
            {this.props.video ? 
                <ReactPlayer url={this.props.video.url} playing={false} />:null}
            </div>
        )
    }
}

export default VideoPlayers
