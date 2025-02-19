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
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (email === 'test@example.com' && password === 'password') {
    return {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    };
  }

  throw new Error('Invalid credentials');
};

export const mockSignUp = async (email: string, password: string, name: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    user: {
      id: '1',
      email,
      name
    }
  };
};
