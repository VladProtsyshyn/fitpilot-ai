import { useState } from 'react';

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
        <div>
            <h1>Meal Planner Page</h1>
            <p>Manage your meals here.</p>

            <input
                type="text"
                placeholder="Enter meal name"
                value={mealName}
                onChange={(event) => setMealName(event.target.value)}
            />

            <button type="button" onClick={handleAddMeal}>
                Add meal
            </button>

            <ul>
                {meals.map((meal) => (
                <li key={meal}>{meal}</li>
                ))}
            </ul>
        </div>
    );
}

export default MealPlannerPage;

