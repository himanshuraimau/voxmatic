# Voxmatic - Note Taking & Task Management App

A modern React Native app for managing notes and todos with real-time sync capabilities using Supabase.

## Features

- 📝 Note Management
  - Create, edit, and delete notes
  - Color-coded notes
  - Rich text formatting
- ✅ Task Management
  - Create and manage todos
  - Mark tasks as complete
  - Quick task creation
- 🔐 Authentication
  - Secure email/password authentication
  - Protected routes
- 📊 Analytics Dashboard
  - Track notes and tasks statistics
  - Activity overview
- 🎨 Modern UI/UX
  - Clean and intuitive interface
  - Responsive design
  - Dark/Light mode support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/voxmatic.git
cd voxmatic
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm start
```

## Project Structure

```
voxmatic/
├── app/                   # Main application screens
│   ├── (tabs)/           # Tab-based screens
│   ├── _layout.tsx       # Root layout with authentication
│   ├── sign-in.tsx       # Sign in screen
│   └── sign-up.tsx       # Sign up screen
├── components/           # Reusable components
├── constants/           # Styles and theme constants
├── services/           # API and business logic
├── types/              # TypeScript type definitions
└── utils/             # Utility functions and configs
```

## Database Schema

### Notes Table
```sql
create table notes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  title text,
  content text,
  color text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  timestamp text
);
```

### Todos Table
```sql
create table todos (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  text text,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details