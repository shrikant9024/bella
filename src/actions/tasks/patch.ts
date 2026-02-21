import { api } from "@/api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTask = ()=>{
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: updateTaskById,
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:["tasks"]})
        }
    })
}


const updateTaskById = async ({id, taskData}:{id:string,taskData:any})=>{
    const response = await api.patch(`/tasks/${id}`, taskData)
    return response.data
}