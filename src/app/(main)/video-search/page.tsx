import React from 'react'
import { Navbar } from '../_components/navbar'
import { VideoSearch } from '../_components/video-search'

const VideoSearchPage = () => {
  return (
    <div className=' h-screen w-screen flex flex-col items-center '>
        <Navbar/>
        <VideoSearch/>
    </div>
  )
}

export default VideoSearchPage