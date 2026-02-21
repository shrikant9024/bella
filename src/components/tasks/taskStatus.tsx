import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useUpdateTask } from '@/actions/tasks/patch'

type TaskStatusProp={
    taskId:string
    status:string
}
const statusStyles: Record<string, string> = {
    To_Do: "text-gray-900",
    In_Progress: "text-yellow-900",
    Done: "text-green-900",
    Merged: "text-purple-900",
}

const TaskStatus = ({taskId, status="To_Do"}:TaskStatusProp) => {
    const updateTaskMutation = useUpdateTask()


    const handleStatusChange = (newStatus:string)=>{
        updateTaskMutation.mutate({
            id:taskId,
            taskData:{status:newStatus}
        },{
            onSuccess:()=>{
                console.log("Task Updated Succesfully")
            },onError:(err)=>{
                console.log("Failed to update task", err)
            }
        },)

    }
  return (
 <Select value={status} onValueChange={handleStatusChange} disabled={updateTaskMutation.isPending}>
            <SelectTrigger className={`w-full max-w-48 font-semibold ${statusStyles[status]}`}>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel defaultValue="To_Do">Status</SelectLabel>          
          <SelectItem value="To_Do" className=' text-gray-900 font-semibold'>To Do</SelectItem>
          <SelectItem value="In_Progress" className='text-yellow-900 font-semibold'>In Progress</SelectItem>
          <SelectItem value="Done" className='text-green-900 font-semibold'>Done</SelectItem>
          <SelectItem value="Merged" className='text-purple-900 font-semibold'>Merged</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>      
    
  )
}

export default TaskStatus
