import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Stylizacja pozostaje bez zmian
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showTrainings, setShowTrainings] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Pobierz dane szkoleń z backendu
    const fetchTrainings = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/accounts/trainings/', {
          credentials: 'include', // Użycie sesji (jeśli włączone w backendzie)
        });
        if (response.ok) {
          const data = await response.json();
          setTrainings(data.trainings); // Zakładam, że backend zwraca listę szkoleń
          setIsAdmin(data.is_admin); // Sprawdź, czy użytkownik jest administratorem
        } else {
          console.error('Błąd podczas pobierania danych:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd połączenia z backendem:', error);
      }
    };

    fetchTrainings();
  }, []);

  const logout = () => {
    navigate('/'); // Przekierowanie do strony logowania
  };

  const toggleTrainings = () => {
    setShowTrainings((prev) => !prev);
  };

  const handleAddUser = () => {
    navigate('/add-user'); // Przekierowanie do interfejsu dodawania użytkownika
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>
            <a href="#" onClick={toggleTrainings}>
              Twoje Szkolenia
            </a>
            {showTrainings && (
              <ul>
                {trainings.length > 0 ? (
                  trainings.map((training, index) => (
                    <li key={index}>{training}</li>
                  ))
                ) : (
                  <li>Brak dostępnych szkoleń</li>
                )}
              </ul>
            )}
          </li>
          <li>
            <a href="#">Struktura Firmy</a>
          </li>
          {isAdmin && (
            <li>
              <a href="#" onClick={handleAddUser}>
                Dodaj Użytkownika
              </a>
            </li>
          )}
          <li>
            <a href="#" onClick={logout}>
              Wyloguj
            </a>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Witamy w panelu użytkownika!</h1>
        <p>Tu możesz dodać swoje główne treści.</p>
      </main>
    </div>
  );
};

export default Dashboard;
