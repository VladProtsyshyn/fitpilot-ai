import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMealsFromStorage } from '../../services/storageService';
import {
    estimateMealNutrition,
    getDailyCaloriesTarget,
    getMacroTargets,
} from '../../utils/nutrition';
import './DashboardPage.css';

function DashboardPage() {
    const profile = useSelector((state) => state.profile);
    const [meals, setMeals] = useState([]);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().slice(0, 10),
    );

    const weight = Number(profile.weight);
    const height = Number(profile.height) / 100;

    useEffect(() => {
        const savedMeals = getMealsFromStorage();
        setMeals(savedMeals || []);
    }, []);

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
    const mealsWithNutrition = meals.map((meal) => ({
        ...meal,
        date: meal.date || selectedDate,
        time: meal.time || '12:00',
        nutrition: meal.nutrition || estimateMealNutrition(meal.name),
    }));
    const filteredMeals = mealsWithNutrition.filter((meal) => meal.date === selectedDate);
    const totalCaloriesConsumed = filteredMeals.reduce(
        (sum, meal) => sum + meal.nutrition.calories,
        0,
    );
    const totalProtein = filteredMeals.reduce(
        (sum, meal) => sum + meal.nutrition.protein,
        0,
    );
    const totalFat = filteredMeals.reduce(
        (sum, meal) => sum + meal.nutrition.fat,
        0,
    );
    const totalCarbs = filteredMeals.reduce(
        (sum, meal) => sum + meal.nutrition.carbs,
        0,
    );
    const calorieTarget = getDailyCaloriesTarget(profile);
    const macroTargets = getMacroTargets(calorieTarget);
    const caloriesRemaining = Math.max(calorieTarget - totalCaloriesConsumed, 0);
    const recentMeals = [...filteredMeals]
        .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
        .slice(0, 3);

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

            <div className="dashboard-filter">
                <label>
                    Selected day
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(event) => setSelectedDate(event.target.value)}
                    />
                </label>
            </div>

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

            <div className="dashboard-summary">
                <div className="dashboard-summary-card">
                    <p className="summary-label">Calories remaining</p>
                    <p className="summary-value">{caloriesRemaining}</p>
                    <p className="summary-subtitle">
                        Consumed on {selectedDate}: {totalCaloriesConsumed} / {calorieTarget} kcal
                    </p>
                </div>

                <div className="dashboard-summary-card">
                    <p className="summary-label">Daily macros</p>

                    <div className="macro-row">
                        <span>Protein</span>
                        <span>
                            {totalProtein}/{macroTargets.protein} g
                        </span>
                    </div>
                    <div className="macro-bar">
                        <div
                            className="macro-fill protein"
                            style={{
                                width: `${Math.min((totalProtein / macroTargets.protein) * 100, 100)}%`,
                            }}
                        />
                    </div>

                    <div className="macro-row">
                        <span>Fat</span>
                        <span>
                            {totalFat}/{macroTargets.fat} g
                        </span>
                    </div>
                    <div className="macro-bar">
                        <div
                            className="macro-fill fat"
                            style={{
                                width: `${Math.min((totalFat / macroTargets.fat) * 100, 100)}%`,
                            }}
                        />
                    </div>

                    <div className="macro-row">
                        <span>Carbs</span>
                        <span>
                            {totalCarbs}/{macroTargets.carbs} g
                        </span>
                    </div>
                    <div className="macro-bar">
                        <div
                            className="macro-fill carbs"
                            style={{
                                width: `${Math.min((totalCarbs / macroTargets.carbs) * 100, 100)}%`,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="dashboard-history">
                <h2>Meal history</h2>

                {recentMeals.length === 0 ? (
                    <div className="dashboard-card">
                        <p>No meal history for this date yet. Add meals to see nutrition insights.</p>
                    </div>
                ) : (
                    recentMeals.map((meal) => (
                        <div className="dashboard-history-card" key={meal.id}>
                            <div>
                                <p className="history-title">{meal.name}</p>
                                <p className="history-calories">{meal.nutrition.calories} kcal</p>
                                <p className="history-time">{meal.time}</p>
                            </div>

                            <div className="history-macros">
                                <span>P {meal.nutrition.protein}g</span>
                                <span>F {meal.nutrition.fat}g</span>
                                <span>C {meal.nutrition.carbs}g</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
