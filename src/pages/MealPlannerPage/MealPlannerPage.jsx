import { useEffect, useState } from 'react';
import { getMealsFromStorage, saveMealsToStorage } from '../../services/storageService';
import Modal from '../../components/Modal/Modal';
import './MealPlannerPage.css';

function MealPlannerPage() {
    const [meals, setMeals] = useState([
        { id: 1, name: 'Oatmeal' },
        { id: 2, name: 'Chicken salad' },
        { id: 3, name: 'Rice with vegetables' },
    ]);
    const [mealName, setMealName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedMeals = getMealsFromStorage();

        if (savedMeals) {
            setMeals(savedMeals);
        }
    }, []);

    const handleAddMeal = () => {
        if (!mealName.trim()) {
            return;
        }

        const newMeal = {
            id: Date.now(),
            name: mealName.trim(),
        };

        setMeals((prevMeals) => {
            const updatedMeals = [...prevMeals, newMeal];
            saveMealsToStorage(updatedMeals);
            return updatedMeals;
        });

        setMealName('');
    };

    const handleDeleteMeal = (mealId) => {
        setMeals((prevMeals) => {
            const updatedMeals = prevMeals.filter((meal) => meal.id !== mealId);
            saveMealsToStorage(updatedMeals);
            return updatedMeals;
        });
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
                        <li key={meal.id}>
                            {meal.name}
                            <button type="button" onClick={() => handleDeleteMeal(meal.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default MealPlannerPage;
