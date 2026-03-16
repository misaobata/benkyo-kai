import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import HRCostSimulation from './pages/HRCostSimulation';
import PayrollCheck from './pages/PayrollCheck';
import CaseSearch from './pages/CaseSearch';
import AICopilot from './pages/AICopilot';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/simulation" element={<HRCostSimulation />} />
          <Route path="/payroll" element={<PayrollCheck />} />
          <Route path="/cases" element={<CaseSearch />} />
          <Route path="/copilot" element={<AICopilot />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

