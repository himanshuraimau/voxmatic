// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  }
];

export const mockSignIn = async (email: string, password: string) => {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { token: 'mock-token-' + user.id, user };
};

export const mockSignUp = async (email: string, password: string, name: string) => {
  const existingUser = MOCK_USERS.find(u => u.email === email);
  
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { token: 'mock-token-new', user: { id: 'new', email, name } };
};
