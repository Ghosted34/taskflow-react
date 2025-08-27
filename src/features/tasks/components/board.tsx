import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useRef } from "react";
import type { RootState, AppDispatch } from "../../../app/store";
import { reorder, updateTask } from "../taskSlice";
import TaskCard from "./card";

const boards: { key: "todo" | "in_progress" | "done"; label: string }[] = [
  { key: "todo", label: "Todo" },
  { key: "in_progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

export default function BoardView() {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch<AppDispatch>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle card drop
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // Skip if dropped in same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const move = {
      id: draggableId,
      sourceBoard: source.droppableId as "todo" | "in_progress" | "done",
      destBoard: destination.droppableId as "todo" | "in_progress" | "done",
      sourceIndex: source.index,
      destIndex: destination.index,
    };

    dispatch(reorder({ id: move.id, data: { ...move } }));

    if (destination.droppableId === "done") {
      dispatch(
        updateTask({
          id: draggableId,
          updates: { board: "done", completed: true },
        })
      );
    } else {
      dispatch(
        updateTask({
          id: draggableId,
          updates: {
            board: destination.droppableId as "todo" | "in_progress",
            completed: false,
          },
        })
      );
    }
  };

  // Drag-to-scroll for mobile
  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const startX = e.pageX - containerRef.current.offsetLeft;
    const scrollLeft = containerRef.current.scrollLeft;

    const onMouseMove = (eMove: MouseEvent) => {
      const x = eMove.pageX - containerRef.current!.offsetLeft;
      const walk = x - startX;
      containerRef.current!.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 overflow-x-auto"
      >
        {boards.map((board) => (
          <Droppable droppableId={board.key} key={board.key}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-50 p-4 rounded-xl shadow flex flex-col min-w-[250px]"
              >
                <h2 className="font-semibold mb-3 text-lg capitalize">
                  {board.label}
                </h2>
                <div className="flex flex-col gap-2">
                  {tasks
                    .filter((task) => task.board === board.key)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              key={task.id}
                              task={task}
                              onMove={(newBoard) =>
                                dispatch(
                                  updateTask({
                                    id: task.id,
                                    updates: { board: newBoard },
                                  })
                                )
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
