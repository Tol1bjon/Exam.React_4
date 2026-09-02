import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Ошибка при загрузке пользователя:', e);
      }
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'Пользователь с таким email уже существует' };
    }

    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // В реальности нужно хешировать
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return { success: true, message: 'Успешная регистрация' };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, message: 'Неверный email или пароль' };
    }

    setUser(foundUser);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    return { success: true, message: 'Успешный вход' };
  };

  const resetPassword = (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      return { success: false, message: 'Email не найден' };
    }

    const newPassword = 'Password' + Math.random().toString(36).substring(7);
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('resetEmail', email);
    localStorage.setItem('resetPassword', newPassword);

    return { success: true, message: 'Инструкции отправлены на почту' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUserData = (updatedUser) => {
    const nextUser = { ...user, ...updatedUser };
    setUser(nextUser);
    localStorage.setItem('currentUser', JSON.stringify(nextUser));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const nextUsers = users.map((item) => (item.id === nextUser.id ? { ...item, ...nextUser } : item));
    localStorage.setItem('users', JSON.stringify(nextUsers));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        resetPassword,
        logout,
        updateUserData,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
