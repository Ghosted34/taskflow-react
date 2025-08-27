export type BoardKey = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  board: BoardKey;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  board?: BoardKey;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  board?: BoardKey;
}

export interface ReorderTasksRequest {
  sourceBoard?: BoardKey;
  destBoard?: BoardKey;
  sourceIndex?: number;
  destIndex?: number;
}

export interface SearchTasksRequest {
  searchTerm: string;
  board?: BoardKey;
  limit?: number;
  page?: number;
}

export interface TasksQueryParams {
  board?: BoardKey;
  limit?: number;
  page?: number;
  sort?: "createdAt" | "board" | "-createdAt" | "-board";
}

export interface ListTasksResponse {
  status: string;
  data: Task[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TasksState {
  items: Task[];
  selectedTasks: string[];
  loading: boolean;
  searchResults: Task[];
  searchLoading: boolean;
  currentBoard?: BoardKey;
  filters: TasksQueryParams;
  totalCount: number;
  hasMore: boolean;
}
