import { api } from "@/api/axios"
import { useQuery } from "@tanstack/react-query"



export const useGetAllTasks = ()=>{
    return useQuery({
        queryKey:["tasks"],
        queryFn:getAllTasks
    })
}

const getAllTasks = async ()=>{
    const response = await api.get("/tasks")
    return response.data
}

export const useGetTask = ()=>{
    return useQuery({
        queryKey:["users"],
        queryFn:getTaskById
    })
}

const getTaskById = async ()=>{
    const response = await api.get("/tasks")
    return response.data
}

