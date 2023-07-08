import './App.css';
import React from 'react';
import Test from './test/test';
import Mode from './mode/mode';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />} />
        </Routes>
        <Routes>
          <Route path="/Mode" element={<Mode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
