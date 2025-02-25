# API Documentation

## Authentication

### Sign In
```typescript
supabase.auth.signInWithPassword({
  email: string,
  password: string
})
```

### Sign Up
```typescript
supabase.auth.signUp({
  email: string,
  password: string
})
```

## Notes API

### Load Notes
```typescript
homeService.loadNotes(): Promise<Note[]>
```
Fetches all notes for the authenticated user.

### Add Note
```typescript
homeService.addNote(
  title: string,
  content: string,
  color: string
): Promise<void>
```
Creates a new note with the specified title, content, and color.

### Delete Note
```typescript
homeService.deleteNote(id: string): Promise<void>
```
Deletes the note with the specified ID.

## Todos API

### Load Todos
```typescript
homeService.loadTodos(): Promise<Todo[]>
```
Fetches all todos for the authenticated user.

### Add Todo
```typescript
homeService.addTodo(text: string): Promise<void>
```
Creates a new todo with the specified text.

### Toggle Todo
```typescript
homeService.toggleTodo(id: string, completed: boolean): Promise<void>
```
Toggles the completion status of a todo.

### Delete Todo
```typescript
homeService.deleteTodo(id: string): Promise<void>
```
Deletes the todo with the specified ID.