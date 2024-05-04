import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetUp = ({setIsSetUpComplete}:{setIsSetUpComplete:(value:boolean)=>void}) => {
    const [isMicCamToggleOn,setIsMicCamToggleOn] = useState(false)
    const call = useCall()
    if(!call) throw new Error("use Streamcall  must be used within streamcall component")
    useEffect(()=>{
            if(isMicCamToggleOn) {
                call?.camera.disable()
                call?.microphone.disable()
            }else{
                call?.camera.enable();
                call?.microphone.enable()
            }
    },[isMicCamToggleOn,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className="text-2xl font-bold">SetUp</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label htmlFor="" className="flex items-center justify-center gap-2 font-medium">
            <input type='checkbox' checked={isMicCamToggleOn} onChange={(e)=> setIsMicCamToggleOn(e.target.checked)} />
            Join with mic and camera off
        </label>
        <DeviceSettings/>
      </div>
      <Button className='rounded-md bg-green-500 px-4 py-2.5 ' onClick={()=>{call.join()
    setIsSetUpComplete(true)}}>Join meeting</Button>
    </div>
  )
}

export default MeetingSetUp