import { removeTask, updateTask } from "../taskSlice";
import { useDispatch } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditTaskModal from "./edit";
import type { AppDispatch } from "../../../app/store";
import type { Task } from "@/shared/types";

interface Props {
  task: Task;
  onMove: (board: Task["board"]) => void;
}

export default function TaskCard({ task }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card className="bg-white p-3 rounded-lg shadow-sm w-full flex flex-col gap-2">
      <h3 className={`font-semibold ${task.completed ? "line-through" : ""}`}>
        {task.title}
      </h3>
      {task.description && <p className="text-sm">{task.description}</p>}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() =>
            dispatch(
              updateTask({
                id: task.id,
                updates: {
                  completed: !task.completed,
                  board: task.completed ? "in_progress" : "done",
                },
              })
            )
          }
        >
          {task.completed ? "Undo" : "Done"}
        </Button>
        <EditTaskModal
          id={task.id}
          currentTitle={task.title}
          currentDescription={task.description}
        />
        <Button
          size="sm"
          variant="destructive"
          onClick={() => dispatch(removeTask(task.id))}
        >
          Delete
        </Button>
        <select
          className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
          value={task.board}
          onChange={(e) =>
            dispatch(
              updateTask({
                id: task.id,
                updates: { board: e.target.value as Task["board"] },
              })
            )
          }
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </Card>
  );
}
