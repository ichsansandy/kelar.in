import React from 'react'
import TaskCard from './TaskCard'

function TaskContainer() {
  return (
    <div className='flex-col justify-center items-center'>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
    </div>
  )
}

export default TaskContainer