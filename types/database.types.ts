export interface Note {
  timestamp: string;
  id: string;
  user_id: string;
  title: string;
  content: string;
  color: string;
  created_at: string;
}

export interface Todo {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
  created_at: string;
}
