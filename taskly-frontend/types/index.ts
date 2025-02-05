interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
  due_date: string;
  created_at: string;
  updated_at?: string;
  user_id: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at?: string;
}

export type { Task, User };
