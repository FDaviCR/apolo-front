import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hefesto_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('hefesto_token');
    const savedUser = localStorage.getItem('hefesto_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        logout();
      }
    } else {
      logout();
    }
    setLoading(false);
  }, []);

  const login = async (usuarioLogin, senha) => {
    try {
      const response = await api.post('/autenticacao/login', { usuario: usuarioLogin, senha: senha });
      const newToken = response.data.token || response.data.tokenAcesso || response.data.data?.token;
      const usuario = response.data.data.usuario;

      if (!newToken) {
        return { success: false, message: 'Token não encontrado na resposta.' };
      }

      localStorage.setItem('hefesto_token', newToken);
      localStorage.setItem('hefesto_user', usuario);

      setToken(newToken);
      setUser(usuario);
      return { success: true };
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: error.response?.data?.mensagem || error.response?.data?.error || 'Erro ao realizar login. Verifique suas credenciais.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('hefesto_token');
    localStorage.removeItem('hefesto_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
