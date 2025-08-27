import type {
  CreateTaskRequest,
  ListTasksResponse,
  ReorderTasksRequest,
  SearchTasksRequest,
  Task,
  TasksQueryParams,
  UpdateTaskRequest,
} from "@/shared/types";
import type { AxiosResponse } from "axios";
import apiClient from "@/shared/api/client";

class TasksService {
  private baseUrl = "/tasks";

  /**
   * Fetch all tasks with optional query parameters
   */
  async list(params?: TasksQueryParams): Promise<ListTasksResponse> {
    const response: AxiosResponse = await apiClient.get(this.baseUrl, {
      params,
    });
    return response.data;
  }

  /**
   * Get a single task by ID
   */
  async get(id: string): Promise<Task> {
    const response: AxiosResponse = await apiClient.get(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  /**
   * Create a new task
   */
  async create(taskData: CreateTaskRequest): Promise<Task> {
    const response: AxiosResponse = await apiClient.post(
      this.baseUrl,
      taskData
    );
    return response.data.data;
  }

  /**
   * Update an existing task
   */
  async update({
    id,
    updates,
  }: {
    id: string;
    updates: UpdateTaskRequest;
  }): Promise<Task> {
    const response: AxiosResponse = await apiClient.patch(
      `${this.baseUrl}/${id}`,
      updates
    );
    return response.data.data;
  }

  /**
   * Delete a task
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Reorder tasks within a board/ to different board
   */
  async reorder({
    id,
    reorderData,
  }: {
    id: string;
    reorderData: ReorderTasksRequest;
  }): Promise<Task> {
    const response: AxiosResponse = await apiClient.patch(
      `${this.baseUrl}/${id}/reorder`,
      reorderData
    );
    return response.data.data;
  }

  /**
   * Search for tasks using title or descriptions with optional query parameters
   */

  async search(query: SearchTasksRequest): Promise<ListTasksResponse> {
    const response: AxiosResponse = await apiClient.get(
      `${this.baseUrl}/search`,
      {
        params: query,
      }
    );
    return response.data;
  }
}

// Create and export singleton instance
export const tasks = new TasksService();
