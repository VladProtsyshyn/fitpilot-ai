import { useSelector } from 'react-redux';
import './CalculatorPage.css';

const assetBase = import.meta.env.BASE_URL;

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
        if (profile.sex === 'female') {
            bmr = Math.round(10 * weight + 6.25 * (height * 100) - 5 * age - 161);
        } else {
            bmr = Math.round(10 * weight + 6.25 * (height * 100) - 5 * age + 5);
        }
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
            <div className="page-heading">
                <img src={`${assetBase}calculator-card.png`} alt="Calculator page icon" />
                <h1>Calculator Page</h1>
            </div>
            <p>Review your BMI, estimated calorie needs, and a simple recommendation based on your goal.</p>

            <div className="calculator-card">
                <div className="calculator-profile">
                    <p>
                        <span>Weight</span>
                        <strong>{profile.weight || 'not set'}</strong>
                    </p>
                    <p>
                        <span>Height</span>
                        <strong>{profile.height || 'not set'}</strong>
                    </p>
                    <p>
                        <span>Age</span>
                        <strong>{profile.age || 'not set'}</strong>
                    </p>
                    <p>
                        <span>Activity level</span>
                        <strong>{profile.activityLevel || 'not selected'}</strong>
                    </p>
                    <p>
                        <span>Sex</span>
                        <strong>{profile.sex || 'not selected'}</strong>
                    </p>
                </div>
                <div className="calculator-highlights">
                    <p>
                        <span>BMI</span>
                        <strong>{bmi || 'not calculated'}</strong>
                    </p>
                    <p>
                        <span>Status</span>
                        <strong>{bmiStatus || 'not available'}</strong>
                    </p>
                    <p>
                        <span>BMR</span>
                        <strong>{bmr || 'not calculated'}</strong>
                    </p>
                    <p>
                        <span>Daily calories</span>
                        <strong>{dailyCalories || 'not calculated'}</strong>
                    </p>
                </div>
                <p>{calorieRecommendation}</p>
            </div>
        </div>
    );
}

export default CalculatorPage;
