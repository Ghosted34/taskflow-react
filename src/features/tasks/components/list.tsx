import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
import { toggleTask, deleteTask } from "../taskSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditTaskModal from "./edit";

export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch();

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4 flex justify-between items-center">
          <div>
            <h3
              className={`font-semibold ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && <p className="text-sm">{task.description}</p>}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.completed ? "Undo" : "Done"}
            </Button>

            <EditTaskModal
              id={task.id}
              currentTitle={task.title}
              currentDescription={task.description}
            />
            <Button
              variant="destructive"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
