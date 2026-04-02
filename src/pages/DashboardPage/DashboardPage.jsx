import { useSelector } from 'react-redux';
import './DashboardPage.css';

function DashboardPage() {
    const profile = useSelector((state) => state.profile);

    const weight = Number(profile.weight);
    const height = Number(profile.height) / 100;

    let bmi = 0;
    let bmiStatus = '';
    const completedFields = [
        profile.name,
        profile.age,
        profile.weight,
        profile.height,
        profile.goal,
    ].filter(Boolean).length;

    const completionPercent = Math.round((completedFields / 5) * 100);

    let tip = 'Complete your profile to get more personalized insights.';

    if (profile.goal === 'lose weight') {
        tip = 'Focus on consistent meals and regular workouts.';
    } else if (profile.goal === 'maintain') {
        tip = 'Keep a balanced routine and track your progress weekly.';
    } else if (profile.goal === 'gain muscle') {
        tip = 'Prioritize protein intake and strength training.';
    }

    if (weight > 0 && height > 0) {
        bmi = (weight / (height * height)).toFixed(1);
    }

    if (bmi > 0 && bmi < 18.5) {
        bmiStatus = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiStatus = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
        bmiStatus = 'Overweight';
    } else if (bmi >= 30) {
        bmiStatus = 'Obesity';
    }

    return (
        <div className="dashboard-page">
            <h1>Dashboard Page</h1>

            <div className="dashboard-card">
                <p>Welcome, {profile.name || 'guest'}!</p>
                <p>Your goal: {profile.goal || 'not selected'}</p>
                <p>Weight: {profile.weight || 'not set'} kg</p>
                <p>Height: {profile.height || 'not set'} cm</p>
            </div>

            <div className="dashboard-card">
                <p>Current BMI: {bmi || 'not calculated'}</p>
                <p>Status: {bmiStatus || 'not available'}</p>
            </div>

            <div className="dashboard-card">
                <p>Profile completion: {completionPercent}%</p>
            </div>

            <div className="dashboard-card">
                <p>Tip of the day:</p>
                <p>{tip}</p>
            </div>
        </div>
    );
}

export default DashboardPage;
