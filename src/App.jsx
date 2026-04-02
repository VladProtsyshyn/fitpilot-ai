import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import TimerPage from './pages/TimerPage/TimerPage';
import MealPlannerPage from './pages/MealPlannerPage/MealPlannerPage';
import AnalyzerPage from './pages/AnalyzerPage/AnalyzerPage';


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/meals" element={<MealPlannerPage />} />
          <Route path="/analyzer" element={<AnalyzerPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;