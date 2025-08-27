import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Notification = {
  id: string;
  title: string;
  description?: string;
  type: "create" | "update" | "delete" | "complete";
};

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      console.log(action.payload);
      state.items.unshift(action.payload); // newest first
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
    markAllAsRead: (state) => {
      state.items = [];
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead } =
  notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
