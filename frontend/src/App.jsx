import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import RevenueSimulator from './pages/RevenueSimulator';
import CampaignGenerator from './pages/CampaignGenerator';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/competitor" element={<CompetitorAnalysis />} />
            <Route path="/revenue" element={<RevenueSimulator />} />
            <Route path="/campaign" element={<CampaignGenerator />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
