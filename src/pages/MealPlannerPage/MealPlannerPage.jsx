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

    useEffect(() => {
        const timerId = setTimeout(() => {
            setIsModalOpen(true);
        }, 1800);

        return () => clearTimeout(timerId);
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

    const handleClearMeals = () => {
        setMeals([]);
        saveMealsToStorage([]);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="meal-page">
            <h1>Meal Planner Page</h1>
            <p>Manage your meals here.</p>
            <p>Total meals: {meals.length}</p>

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
                <button type="button" onClick={handleClearMeals}>
                    Clear all meals
                </button>
            </div>

            <div className="meal-list">
                {meals.length === 0 ? (
                    <p>No meals added yet.</p>
                ) : (
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
                )}
            </div>
            {isModalOpen && <Modal onClose={handleCloseModal} />}
        </div>
    );
}

export default MealPlannerPage;
