import { api } from "@/api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteTask = ()=>{
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: deleteTaskById,
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:["tasks"]})
        }
    })
}


const deleteTaskById = async (id: any)=>{
    const response = await api.delete(`/tasks/${id}`)
    return response.data
}