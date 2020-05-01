import React, { Component } from 'react'
import VideoPlayers from './VideoPlayers'


export class Video extends Component {

    renderAllVideos = (videos) => {
        // console.log(videos)
        return videos.map((video,idx)=>{
            return <VideoPlayers key={idx} video={video}/>
        })
    }

  render () {
    return (
      <div>
        <h1>My Videos</h1>
        {this.props.userData.student ? this.renderAllVideos(this.props.userData.student.videos):null}
      </div>
    )
  }
}

export default Video
