import React from 'react';
import './App.css';
import logo from './assets/holberton-logo.jpg';

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="holberton logo" className="logo" />
        <h1>School dashboard</h1>
      </header>

      <main className="App-body">
        <p>Login to access the full dashboard</p>
      </main>

      <footer className="App-footer">
        <p><em>Copyright {year} - holberton School</em></p>
      </footer>
    </div>
  );
}
