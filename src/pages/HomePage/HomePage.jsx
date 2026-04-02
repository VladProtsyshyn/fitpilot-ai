import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <h1>FitPilot AI</h1>
            <p>Your fitness and nutrition companion.</p>

            <div className="home-actions">
                <Link to="/profile">Set up profile</Link>
                <Link to="/dashboard">Open dashboard</Link>
            </div>
            <p>
                Track your profile, monitor your BMI, and manage your workout timer in
                one place.
            </p>
        </div>
    );
}

export default HomePage;