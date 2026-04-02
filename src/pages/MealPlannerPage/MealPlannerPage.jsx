import { useState } from 'react';
import './MealPlannerPage.css';

function MealPlannerPage() {
    const [meals, setMeals] = useState([
        'Oatmeal',
        'Chicken salad',
        'Rice with vegetables',
    ]);
    const [mealName, setMealName] = useState('');

    const handleAddMeal = () => {
        if (!mealName.trim()) {
        return;
    }
        setMeals((prevMeals) => [...prevMeals, mealName]);
        setMealName('');
    };

    return (
        <div className="meal-page">
            <h1>Meal Planner Page</h1>
            <p>Manage your meals here.</p>

            <div className="meal-form">
                <input
                    type="text"
                    placeholder="Enter meal name"
                    value={mealName}
                    onChange={(event) => setMealName(event.target.value)}
                />

                <button type="button" onClick={handleAddMeal}>
                    Add meal
                </button>
            </div>

            <div className="meal-list">
                <ul>
                    {meals.map((meal) => (
                    <li key={meal}>{meal}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MealPlannerPage;

