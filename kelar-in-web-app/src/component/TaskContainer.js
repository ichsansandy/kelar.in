import React from 'react'
import TaskCard from './TaskCard'

function TaskContainer({taskList}) {
  return (
    <div className='lg:w-[50rem] grid grid-rows-2 lg:grid-flow-col overflow-auto '>
        {/* <div key={taskList?.id}></div> */}
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
    </div>
  )
}

export default TaskContainer