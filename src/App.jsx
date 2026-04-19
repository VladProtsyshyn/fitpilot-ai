import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage/CalculatorPage'));
const TimerPage = lazy(() => import('./pages/TimerPage/TimerPage'));
const MealPlannerPage = lazy(() => import('./pages/MealPlannerPage/MealPlannerPage'));
const AnalyzerPage = lazy(() => import('./pages/AnalyzerPage/AnalyzerPage'));

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Layout>
        <Suspense fallback={<p className="page-loading">Loading page...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/meals" element={<MealPlannerPage />} />
            <Route path="/analyzer" element={<AnalyzerPage />} />
          </Routes>
        </Suspense>
      </Layout>
      <Footer />
    </HashRouter>
  );
}

export default App;
