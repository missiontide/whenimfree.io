import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MultiSelect } from "./multi-select";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        When I'm Free
          <MultiSelect />
      </header>
    </div>
  );
}

export default App;
