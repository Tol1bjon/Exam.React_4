export const initializeDemoAccounts = () => {
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers) {
    const demoUsers = [
      {
        id: '1',
        name: 'Анна Петрова',
        email: 'anna@example.com',
        password: '123456',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Иван Сидоров',
        email: 'ivan@example.com',
        password: '123456',
        createdAt: new Date().toISOString(),
      },
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};
