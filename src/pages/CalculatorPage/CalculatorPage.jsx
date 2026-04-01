import { useSelector } from 'react-redux';
import './CalculatorPage.css';

function CalculatorPage() {
    const profile = useSelector((state) => state.profile);

    const weight = Number(profile.weight);
    const height = Number(profile.height) / 100;

    let bmi = 0;
    let bmiStatus = '';

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
        <div className="calculator-page">
            <h1>Calculator Page</h1>

            <div className="calculator-card">
                <p>Weight: {profile.weight}</p>
                <p>Height: {profile.height}</p>
                <p>Age: {profile.age}</p>
                <p>BMI: {bmi}</p>
                <p>Status: {bmiStatus}</p>
            </div>
        </div>
    );
}

export default CalculatorPage;

