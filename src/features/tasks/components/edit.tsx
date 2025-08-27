import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../taskSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Task } from "@/shared/types";
import type { AppDispatch } from "@/app/store";

interface EditTaskModalProps {
  id: string;
  currentTitle: string;
  currentDescription?: string;
}

export default function EditTaskModal({
  id,
  currentTitle,
  currentDescription,
}: EditTaskModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription || "");

  const handleSave = () => {
    if (!title.trim()) return;
    dispatch(
      updateTask({ id, updates: { title, description } as Partial<Task> })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            className="border rounded px-2 py-1 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <Input
            className="border rounded px-2 py-1 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
          />

          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
