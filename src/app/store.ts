import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../features/tasks/taskSlice";
import { notificationsReducer } from "@/features/notifications/slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    notifications: notificationsReducer,
  },
});

// Types for TS hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
