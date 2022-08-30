const initialData = {
  tasks: {
      "task-1": { id: "task-1", content: "Test" },
      "task-2": { id: "task-2", content: "Build Authentication" },
      "task-3": { id: "task-3", content: "Add Navigation" },
      "task-4": { id: "task-4", content: "Create Landing Page" }
  },
  columns: {
      "column-1": { id: "column-1", title: "Issues", taskIds: ['task-1'] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: ['task-2', 'task-3'] },
      "column-3": { id: "column-3", title: "Review", taskIds: [] },
      "column-4": { id: "column-4", title: "Completed", taskIds: ["task-4"] }
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"]
}

export default initialData