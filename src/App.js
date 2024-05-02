import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage1';
import AdminPage1 from './components/AdminPage1';


export default function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<Homepage />} />
        <Route path="dashboard" element= {<Dashboard/>}/>
        <Route path="admin" element= {<AdminPage1/>}/>
      </Routes>
    </div>
  );
} 