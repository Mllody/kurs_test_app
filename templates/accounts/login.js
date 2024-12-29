import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // używamy hooka do przekierowań

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // do obsługi sesji
      });

      if (response.ok) {
        alert("Zalogowano pomyślnie!");
        navigate("/dashboard"); // przekierowanie na stronę dashboard
      } else {
        alert("Nieprawidłowe dane logowania.");
      }
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
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
