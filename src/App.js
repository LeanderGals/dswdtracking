import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage1';
import AdminPage1 from './components/AdminPage1';
import SignupPage from './components/SignupPage';
import ForgotPass from './components/ForgotPass';


export default function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<Homepage />} />
        <Route path="dashboard" element= {<Dashboard/>}/>
        <Route path="admin" element= {<AdminPage1/>}/>
        <Route path="signup" element= {<SignupPage/>}/>
        <Route path="forgot" element= {<ForgotPass/>}/>
      </Routes>
    </div>
  );
} 