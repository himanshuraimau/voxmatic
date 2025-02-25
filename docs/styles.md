# Styles Documentation

## Theme Colors

```typescript
const colors = {
  primary: '#f4b400',
  background: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  error: '#ff3b30',
  success: '#4CAF50',
};
```

## Common Styles

### Container
```typescript
container: {
  flex: 1,
  backgroundColor: '#ffffff',
}
```

### Headers
```typescript
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
}
```

### Buttons
```typescript
button: {
  backgroundColor: '#f4b400',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
}

buttonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
}
```

### Inputs
```typescript
input: {
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
}
```

## Layout Guidelines

- Use consistent spacing (8, 16, 24, 32px)
- Maintain proper hierarchy with font sizes
- Keep components aligned and padded properly
- Use borderRadius consistently (8px for most elements)