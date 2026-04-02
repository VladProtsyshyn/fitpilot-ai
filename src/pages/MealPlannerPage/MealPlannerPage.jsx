import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import './MealPlannerPage.css';

function MealPlannerPage() {
    const [meals, setMeals] = useState([
        'Oatmeal',
        'Chicken salad',
        'Rice with vegetables',
    ]);
    const [mealName, setMealName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <button type="button" onClick={() => setIsModalOpen(true)}>
                    Open modal
                </button>

            </div>

            <div className="meal-list">
                <ul>
                    {meals.map((meal) => (
                    <li key={meal}>{meal}</li>
                    ))}
                </ul>
            </div>
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default MealPlannerPage;

