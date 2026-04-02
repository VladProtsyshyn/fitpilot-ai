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
            <div className="home-features">
                <div>
                    <h3>Profile tracking</h3>
                    <p>Save your personal data and fitness goal.</p>
                </div>

                <div>
                    <h3>BMI insights</h3>
                    <p>Check your BMI and monitor your current status.</p>
                </div>

                <div>
                    <h3>Meal planning</h3>
                    <p>Create and manage your daily meals in one place.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;