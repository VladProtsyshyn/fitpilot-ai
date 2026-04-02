import { useSelector } from 'react-redux';
import './DashboardPage.css';

function DashboardPage() {
    const profile = useSelector((state) => state.profile);

    return (
        <div className="dashboard-page">
            <h1>Dashboard Page</h1>

            <div className="dashboard-card">
                <p>Welcome, {profile.name || 'guest'}!</p>
                <p>Your goal: {profile.goal || 'not selected'}</p>
                <p>Weight: {profile.weight || 'not set'} kg</p>
                <p>Height: {profile.height || 'not set'} cm</p>
            </div>
        </div>
    );
}

export default DashboardPage;
