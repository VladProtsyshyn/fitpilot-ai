import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetProfile, setProfile } from '../../store/slices/profileSlice';
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
        activityLevel: '',
        sex: '',
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

    const handleResetProfile = () => {
        dispatch(resetProfile());
        saveProfileToStorage({
            name: '',
            age: '',
            weight: '',
            height: '',
            goal: '',
            activityLevel: '',
            sex: '',
        });
        setFormData({
            name: '',
            age: '',
            weight: '',
            height: '',
            goal: '',
            activityLevel: '',
            sex: '',
        });
    };

    return (
        <div className="profile-page">
            <div className="page-heading">
                <img src="/profile-card.png" alt="Profile page icon" />
                <h1>Profile Page</h1>
            </div>
            <p>Build your personal nutrition and fitness profile to unlock better daily insights.</p>

            <div className="profile-grid">
                <div className="profile-form">
                    <div className="profile-section-heading">
                        <h2>Profile setup</h2>
                        <span>Fill in your core details and create a solid wellness baseline.</span>
                    </div>

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

                    <label>
                        Activity level
                        <select
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                        >
                            <option value="">Select activity level</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                    <label>
                        Sex
                        <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                        >
                            <option value="">Select sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>

                    <button type="button" onClick={handleSaveProfile}>
                        Save profile
                    </button>
                </div>

                <div className="profile-summary">
                    <div className="profile-section-heading">
                        <h2>Saved overview</h2>
                        <span>Quick summary of the details currently shaping your app insights.</span>
                    </div>

                    <p>Name: {profile.name}</p>
                    <p>Age: {profile.age}</p>
                    <p>Weight: {profile.weight}</p>
                    <p>Height: {profile.height}</p>
                    <p>Goal: {profile.goal}</p>
                    <p>Activity level: {profile.activityLevel}</p>
                    <p>Sex: {profile.sex}</p>

                    <button type="button" onClick={handleResetProfile}>
                        Reset profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
