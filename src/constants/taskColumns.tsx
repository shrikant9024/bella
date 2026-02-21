import type { ColumnDef } from "@tanstack/react-table";
import TaskStatus from "@/components/tasks/taskStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export type Task = {
  _id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
};



export const taskColumns=(onEdit:(task:Task)=>void, onDelete:(id:string)=>void): ColumnDef<Task>[] => [
  {
    accessorKey: "name",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const task = row.original;
      return <TaskStatus taskId={task._id} status={task.status} />;
    },
  },
  // {
  //   accessorKey: "completion_date",
  //   header: "Completion Date",
  // },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit(task)} 
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(task._id)} // replace with your delete handler
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];