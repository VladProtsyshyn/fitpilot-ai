import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <h1>FitPilot AI</h1>
            <p>Your fitness and nutrition companion.</p>

            <div className="home-welcome">
                <h2>Welcome to your personal fitness workspace</h2>
                <p>
                    Start with your profile, keep your meals and calories in one place,
                    and use the analyzer to turn food photos into daily nutrition data.
                </p>
            </div>

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
            <div className="home-resources">
                <h2>Learning resources</h2>
                <p>Useful video resources for fitness, nutrition, and healthy habits.</p>
                <a
                    href="https://www.youtube.com/watch?v=UItWltVZZmE"
                    target="_blank"
                    rel="noreferrer"
                >
                    Beginner full body workout
                </a>
                <a
                    href="https://www.youtube.com/watch?v=2pLT-olgUJs"
                    target="_blank"
                    rel="noreferrer"
                >
                    Nutrition basics for beginners
                </a>
            </div>
        </div>
    );
}

export default HomePage;
