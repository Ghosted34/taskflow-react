import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "./slice"; // your notifications slice
import { io } from "socket.io-client";
import { TASK_EVENTS } from "@/lib/events";
import type { AppDispatch } from "@/app/store";

// connect socket (adjust URL to your backend)
const socket = io("http://localhost:3000");

/**
 * Hook: subscribes to task notifications from the socket
 * Can be used inside App.tsx
 */
export function useTaskNotifications() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // specific task events
    socket.on(TASK_EVENTS.CREATED, (task) => {
      dispatch(
        addNotification({
          id: task.id,
          title: `${task.title} was created`,
          description: task.description,
          type: "create",
        })
      );
    });

    socket.on(TASK_EVENTS.UPDATED, (task) => {
      let action = `${task.title} was updated`;

      switch (task.board) {
        case "todo":
          action = `${task.title} was Paused`;
          break;
        case "in_progress":
          action = `${task.title} was Started`;
          break;
        case "done":
          action = `${task.title} was Completed`;
          break;

        default:
          break;
      }
      dispatch(
        addNotification({
          id: task.id,
          title: action,
          description: task.title,
          type: task.board === "done" ? "complete" : "update",
        })
      );
    });

    socket.on(TASK_EVENTS.DELETED, (task) => {
      dispatch(
        addNotification({
          id: task.id,
          title: `${task.title} was Deleted`,
          description: task.title,
          type: "delete",
        })
      );
    });

    // cleanup on unmount
    return () => {
      socket.off(TASK_EVENTS.CREATED);
      socket.off(TASK_EVENTS.UPDATED);
      socket.off(TASK_EVENTS.DELETED);
    };
  }, [dispatch]);
}
