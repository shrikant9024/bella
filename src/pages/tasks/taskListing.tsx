import { useDeleteTask } from '@/actions/tasks/delete'
import { useGetAllTasks } from '@/actions/tasks/get'
import AddTaskModal from '@/components/tasks/add-task-modal'
import DataTable from '@/components/tasks/task-data-table'
import TaskHeader from '@/components/tasks/task-header'
import { taskColumns, type Task } from '@/constants/taskColumns'
import React, { useState } from 'react'



const TaskListing = () => {
    const [open,setOpen] = useState(false)
    const[editTask,setEditTask] = useState<Task | null>(null)
        const deleteTaskMutation = useDeleteTask()

    const{data=[], isLoading, error} = useGetAllTasks()
     if(isLoading) return <p>Loading...</p>
    if (error) return <p>Failed to load Data</p>

    const handleEdit=(task:Task)=>{
      setEditTask(task)
    }
    const handleDelete = (id:string)=>{
      deleteTaskMutation.mutate(id)
    }

    const columns = taskColumns(handleEdit,handleDelete)
  return (
    <div className='bg-gray-100 min-h-screen flex justify-center pt-16 items-start'>
       <div className="w-full max-w-6xl bg-white rounded-2xl shadow p-6">

        <TaskHeader onAddClick={()=>setOpen(true)} />
            <DataTable columns={columns} data={data}/>
        <AddTaskModal open={open || !!editTask} setOpen={setOpen}  onClose={() => {
    setOpen(false)
    setEditTask(null)
  }} initialData={editTask}/>
      </div>

    </div>
  )
}

export default TaskListing
