import type {
  ReorderTasksRequest,
  SearchTasksRequest,
  Task,
  TasksQueryParams,
  TasksState,
} from "@/shared/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { tasks } from "./api";

// Thunks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (query?: TasksQueryParams) => {
    const res = await tasks.list(query);
    return res;
  }
);

export const saveTask = createAsyncThunk(
  "tasks/saveTask",
  async (task: Omit<Task, "id">) => {
    const res = await tasks.create(task);
    return res;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    const res = await tasks.update({ id, updates });
    return res;
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id: string) => {
    await tasks.delete(id);
    return id;
  }
);

export const reorder = createAsyncThunk(
  "tasks/reorderTask",
  async ({ id, data }: { id: string; data: ReorderTasksRequest }) => {
    const res = await tasks.reorder({ id, reorderData: data });
    return res;
  }
);

export const searchTasks = createAsyncThunk(
  "tasks/searchTasks",
  async (query: SearchTasksRequest) => {
    const res = await tasks.search(query);
    return res;
  }
);

export type BoardKey = "todo" | "in_progress" | "done";

const initialState: TasksState = {
  items: [],
  selectedTasks: [],
  loading: false,
  searchResults: [],
  searchLoading: false,
  currentBoard: undefined,
  filters: {},
  totalCount: 0,
  hasMore: true,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // UI-only state management
    setSelectedTasks: (state, action: PayloadAction<string[]>) => {
      state.selectedTasks = action.payload;
    },

    toggleTaskSelection: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const index = state.selectedTasks.indexOf(taskId);
      if (index === -1) {
        state.selectedTasks.push(taskId);
      } else {
        state.selectedTasks.splice(index, 1);
      }
    },

    setCurrentBoard: (state, action: PayloadAction<BoardKey | undefined>) => {
      state.currentBoard = action.payload;
    },

    setFilters: (state, action: PayloadAction<TasksQueryParams>) => {
      state.filters = action.payload;
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch cases
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.loading = false;
        state.totalCount = action.payload.meta.total;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })

      //save cases
      .addCase(saveTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(saveTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(saveTask.pending, (state) => {
        state.loading = true;
      })

      //update cases
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })

      //delete cases
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(removeTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
      })

      //reorder cases
      .addCase(reorder.fulfilled, (state, action) => {
        const { id, position } = action.payload;
        const task = state.items.find((t) => t.id === id);
        if (task) {
          state.items = state.items.filter((t) => t.id !== id);
          state.items.splice(position ?? 0, 0, task);
        }
      })
      .addCase(reorder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(reorder.pending, (state) => {
        state.loading = true;
      })
      // Search cases
      .addCase(searchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.loading = false;
        state.totalCount = action.payload.meta.total;
      })
      .addCase(searchTasks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setCurrentBoard,
  toggleTaskSelection,
  clearSearchResults,
  setSelectedTasks,
  setFilters,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
