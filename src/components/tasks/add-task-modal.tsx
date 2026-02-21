import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Field, FieldGroup } from '../ui/field'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useCreateTask } from '@/actions/tasks/post'
import type { Task } from '@/constants/taskColumns'
import { useUpdateTask } from '@/actions/tasks/patch'

type AddTaskModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Task | null;
  onClose: () => void;
}

const AddTaskModal = ({ open, setOpen, initialData, onClose }: AddTaskModalProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const mutation = useCreateTask()
  const updateMutation = useUpdateTask()

  const isEditing = !!initialData
  const isPending = isEditing ? updateMutation.isPending : mutation.isPending

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.name)
      setDescription(initialData.description)
    } else {
      setTitle("")
      setDescription("")
    }
  }, [initialData])

  const handleClose = () => {
    setTitle("")
    setDescription("")
    setOpen(false)
    onClose()
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEditing) {
      updateMutation.mutate(
        { id: initialData._id, taskData: { name: title, description } },
        {
          onSuccess: handleClose,
          onError: (err) => console.log("Error Updating Task", err),
        }
      )
    } else {
      mutation.mutate(
        { name: title, description },
        {
          onSuccess: handleClose,
          onError: (err) => console.log("Error Creating Task", err),
        }
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={submitHandler}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Task" : "Create Task"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your task details." : "What are you planning today?"}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className='mt-4'>
            <Field>
              <Label htmlFor="task-title">Task Name</Label>
              <Input
                id="task-title"
                name="name"
                placeholder='Enter task name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="task-description">Description</Label>
              <Input
                id="task-description"
                name="description"
                placeholder='Description of the task'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className='mt-4'>
            <Button variant="outline" type='button' onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskModal