import { useSelector } from 'react-redux';
import './CalculatorPage.css';

function CalculatorPage() {
    const profile = useSelector((state) => state.profile);

    const weight = Number(profile.weight);
    const height = Number(profile.height) / 100;

    const age = Number(profile.age);

    let bmr = 0;

    let dailyCalories = 0;

    let activityMultiplier = 1.2;

    let bmi = 0;
    let bmiStatus = '';
    let calorieRecommendation = 'Complete your profile to get a recommendation.';

    if (weight > 0 && height > 0) {
        bmi = (weight / (height * height)).toFixed(1);
    }
    if (weight > 0 && height > 0 && age > 0) {
        bmr = Math.round(10 * weight + 6.25 * (height * 100) - 5 * age + 5);
    }
    if (profile.activityLevel === 'medium') {
        activityMultiplier = 1.55;
    } else if (profile.activityLevel === 'high') {
        activityMultiplier = 1.75;
    }
    if (bmr > 0) {
        dailyCalories = Math.round(bmr * activityMultiplier);
    }
    if (profile.goal === 'lose weight' && dailyCalories > 0) {
        calorieRecommendation = `Recommended intake: ${dailyCalories - 300} kcal`;
    } else if (profile.goal === 'maintain' && dailyCalories > 0) {
        calorieRecommendation = `Recommended intake: ${dailyCalories} kcal`;
    } else if (profile.goal === 'gain muscle' && dailyCalories > 0) {
        calorieRecommendation = `Recommended intake: ${dailyCalories + 300} kcal`;
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
        <div className="calculator-page">
            <h1>Calculator Page</h1>

            <div className="calculator-card">
                <p>Weight: {profile.weight}</p>
                <p>Height: {profile.height}</p>
                <p>Age: {profile.age}</p>
                <p>Activity level: {profile.activityLevel}</p>
                <p>BMI: {bmi}</p>
                <p>Status: {bmiStatus}</p>
                <p>BMR: {bmr}</p>
                <p>Daily calories: {dailyCalories}</p>
                <p>{calorieRecommendation}</p>
            </div>
        </div>
    );
}

export default CalculatorPage;

