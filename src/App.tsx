import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import LandingPage from './pages/landing-page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>}></Route>
          <Route path="/home" element={<a/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
