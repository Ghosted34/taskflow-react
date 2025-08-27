import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { saveTask } from "../taskSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [desc, setDesc] = useState("");
  const handleAdd = () => {
    if (!title.trim()) return;
    dispatch(
      saveTask({ title, description: desc, completed: false, board: "todo" })
    );
    setTitle("");
    setDesc("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <Input
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Enter Description..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <Button className="sm:w-auto w-full" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
}
