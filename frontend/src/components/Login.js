import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://nullsec-ai.onrender.com/accounts/login/', { // Zmień tutaj
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Ważne dla sesji w Django
      });
      if (response.ok) {
        alert('Zalogowano pomyślnie!');
        navigate('/dashboard'); // Przekierowanie po zalogowaniu
      } else {
        alert('Nieprawidłowe dane logowania.');
      }
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
    }
  };

  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nazwa użytkownika:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Hasło:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default Login;
