import { socket } from "../../lib/socket";
import { TASK_EVENTS } from "../../lib/events";
import type { AppDispatch } from "../../app/store";
import { saveTask, updateTask, removeTask, reorder } from "./taskSlice";

/**
 * Call once in app startup: initTaskSocket(dispatch)
 * It will keep the redux store in sync with server broadcasts.
 */
export const initTaskSocket = (dispatch: AppDispatch) => {
  socket.on(TASK_EVENTS.CREATED, (task) => {
    dispatch(saveTask(task));
  });

  socket.on(TASK_EVENTS.UPDATED, (task) => {
    dispatch(updateTask(task));
  });

  socket.on(TASK_EVENTS.DELETED, (id: string) => {
    dispatch(removeTask(id));
  });

  socket.on(TASK_EVENTS.REORDERED, (move) => {
    dispatch(
      reorder({
        id: move.id,
        data: {
          sourceBoard: move.sourceBoard,
          destBoard: move.destBoard,
          sourceIndex: move.sourceIndex,
          destIndex: move.destIndex,
        },
      })
    );
  });
};
