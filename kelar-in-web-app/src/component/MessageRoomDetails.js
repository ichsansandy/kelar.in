import React from 'react'

function MessageRoomDetails() {
  return (
    <div className=''>
        <div className='h-[55px] bg-secondary-color/50'>Top</div>
        <div className='h-[62vh] -z-10 bg-secondary-color/70' >Body</div>
        <form className='flex bg-white h-full border-red-300 border-4 m-0'>
            <textarea className='border-0 m-auto w-[90%]'/>
            <button className='m-auto'>send</button>
        </form>
    </div>
  )
}

export default MessageRoomDetails