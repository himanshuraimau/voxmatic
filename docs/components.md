# Components Documentation

## Navigation Components

### TabLayout
Main tab-based navigation component that handles the bottom tab bar and floating action button.

```typescript
<TabLayout>
  <Tabs.Screen name="index" />
  <Tabs.Screen name="analytics" />
  <Tabs.Screen name="settings" />
</TabLayout>
```

## Note Components

### NoteCard
Displays a single note with title, content, and color.

```typescript
<NoteCard
  title={string}
  content={string}
  timestamp={string}
  color={string}
  onPress={() => void}
  onDelete={() => void}
/>
```

### NewNoteModal
Modal for creating new notes.

```typescript
<NewNoteModal
  visible={boolean}
  title={string}
  content={string}
  selectedColor={string}
  colors={string[]}
  onChangeTitle={(text: string) => void}
  onChangeContent={(text: string) => void}
  onSelectColor={(color: string) => void}
  onSave={() => void}
  onClose={() => void}
/>
```

## Todo Components

### TodoItem
Displays a single todo item with completion toggle.

```typescript
<TodoItem
  text={string}
  completed={boolean}
  onToggle={() => void}
  onDelete={() => void}
/>
```

### TodosSection
Displays a section of todos with header.

```typescript
<TodosSection
  todos={Todo[]}
  onToggleTodo={(id: string) => void}
  onDeleteTodo={(id: string) => void}
/>
```