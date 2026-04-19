import { useEffect, useState } from 'react';
import { getMealsFromStorage, saveMealsToStorage } from '../../services/storageService';
import Modal from '../../components/Modal/Modal';
import TrashIcon from '../../components/icons/TrashIcon';
import PageHeading from '../../components/PageHeading/PageHeading';

import './MealPlannerPage.css';

const assetBase = import.meta.env.BASE_URL;

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
            <PageHeading
                image={`${assetBase}meals-card.png`}
                title="Meal Planner Page"
                alt="Meals page icon"
            />
            <p>Build a simple daily meal plan, keep track of your entries, and manage everything in one place.</p>
            <p>Total meals: {meals.length}</p>

            <div className="meal-form">
                <div className="meal-form-heading">
                    <p>Plan your next meal</p>
                    <span>Keep entries simple, clear, and easy to update during the day.</span>
                </div>

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
                                <span className="meal-name">{meal.name}</span>
                                <button type="button" onClick={() => handleDeleteMeal(meal.id)}>
                                    <TrashIcon />  
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
