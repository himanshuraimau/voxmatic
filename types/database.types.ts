export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  color: string;
  created_at: string;
  timestamp: string;
};

export type Todo = {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
  created_at: string;
};
