import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../store/slices/profileSlice';
import { getProfileFromStorage, saveProfileToStorage } from '../../services/storageService';

import './ProfilePage.css';

function ProfilePage() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        goal: '',
    });

    useEffect(() => {
        const savedProfile = getProfileFromStorage();

        if (savedProfile) {
            dispatch(setProfile(savedProfile));
            setFormData(savedProfile);
        }
    }, [dispatch]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveProfile = () => {
        dispatch(setProfile(formData));
        saveProfileToStorage(formData);
    };

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>

            <div className="profile-summary">
                <p>Name: {profile.name}</p>
                <p>Age: {profile.age}</p>
                <p>Weight: {profile.weight}</p>
                <p>Height: {profile.height}</p>
                <p>Goal: {profile.goal}</p>
            </div>

            <div className="profile-form">
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Age
                    <input
                        type="number"
                        name="age"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Weight
                    <input
                        type="number"
                        name="weight"
                        placeholder="Enter your weight"
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Height
                    <input
                        type="number"
                        name="height"
                        placeholder="Enter your height"
                        value={formData.height}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Goal
                    <select name="goal" value={formData.goal} onChange={handleChange}>
                        <option value="">Select goal</option>
                        <option value="lose weight">Lose weight</option>
                        <option value="maintain">Maintain</option>
                        <option value="gain muscle">Gain muscle</option>
                    </select>
                </label>

                <button type="button" onClick={handleSaveProfile}>
                    Save profile
                </button>
            </div>
        </div>
    );

}

export default ProfilePage;


