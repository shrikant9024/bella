import { api } from "@/api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"



export const useCreateTask = ()=>{
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: createTask,
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:["tasks"]})
        }
    })
}


const createTask = async (taskData: any)=>{
    const response = await api.post("/tasks",taskData)
    return response.data
}