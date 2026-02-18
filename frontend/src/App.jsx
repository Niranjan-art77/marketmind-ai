import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import RevenueSimulator from './pages/RevenueSimulator';
import CampaignGenerator from './pages/CampaignGenerator';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/competitor" element={<CompetitorAnalysis />} />
          <Route path="/revenue" element={<RevenueSimulator />} />
          <Route path="/campaign" element={<CampaignGenerator />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
