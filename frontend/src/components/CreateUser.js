import React, { useState, useEffect } from "react";
import "./CreateUser.css";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Pobierz dostępne stanowiska z backendu
    const fetchPositions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/positions/");
        if (response.ok) {
          const data = await response.json();
          setPositions(data);
        } else {
          console.error("Błąd podczas pobierania stanowisk.");
        }
      } catch (error) {
        console.error("Błąd:", error);
      }
    };

    fetchPositions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/create-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          position_id: selectedPosition,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Użytkownik ${data.username} został pomyślnie utworzony!`);
        setUsername("");
        setEmail("");
        setPassword("");
        setSelectedPosition("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Wystąpił błąd podczas tworzenia użytkownika.");
      }
    } catch (error) {
      console.error("Błąd:", error);
      setMessage("Wystąpił błąd podczas tworzenia użytkownika.");
    }
  };

  return (
    <div className="create-user-container">
      <h2>Tworzenie nowego użytkownika</h2>
      {message && <p className="message">{message}</p>}
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
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Hasło:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Stanowisko:
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            required
          >
            <option value="">Wybierz stanowisko</option>
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Utwórz użytkownika</button>
      </form>
    </div>
  );
};

export default CreateUser;
