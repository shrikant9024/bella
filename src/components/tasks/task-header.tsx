
import { useState } from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react';

type TaskHeaderProps = {
    onAddClick: ()=>void;
}

const TaskHeader = ({onAddClick}:TaskHeaderProps) => {


    
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Tasks
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Manage and track all your team tasks in one place.
        </p>
      </div>
      <div> <Button
        
        className="bg-purple-700 hover:bg-purple-600 cursor-pointer font-medium"
        onClick={onAddClick}
      >
        {/* <Plus className="h-4 w-4" /> */}
       <Plus className=''/><span> Create Task</span> 
      </Button></div>
     
    </div>
  )
}

export default TaskHeader
