export const TASK_EVENTS = {
  CREATE: "task:create",
  CREATED: "task:created",
  UPDATE: "task:update",
  UPDATED: "task:updated",
  DELETE: "task:delete",
  DELETED: "task:deleted",
  REORDER: "task:reorder",
  REORDERED: "task:reordered",
} as const;
export type TaskEvent = (typeof TASK_EVENTS)[keyof typeof TASK_EVENTS];
