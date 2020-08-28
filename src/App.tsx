import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchData } from "./utils/dist/fetchData";

function App() {
  if (fetchData) {
    fetchData('http://localhost:8080/api/makes').then(response => { console.log(response) });
    fetchData('http://localhost:8080/api/models?make=Ford').then(response => { console.log(response) });
    fetchData('http://localhost:8080/api/vehicles?make=Ford&model=Fiesta').then(response => { console.log(response) });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
        
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
