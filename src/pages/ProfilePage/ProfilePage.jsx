import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../store/slices/profileSlice';

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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveProfile = () => {
        dispatch(setProfile(formData));
    };

    return (
        <div>
            <h1>Profile Page</h1>

            <p>Name: {profile.name}</p>
            <p>Age: {profile.age}</p>
            <p>Weight: {profile.weight}</p>
            <p>Height: {profile.height}</p>
            <p>Goal: {profile.goal}</p>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
                <label>
                Goal
                <select name="goal" value={formData.goal} onChange={handleChange}>
                    <option value="">Select goal</option>
                    <option value="lose weight">Lose weight</option>
                    <option value="maintain">Maintain</option>
                    <option value="gain muscle">Gain muscle</option>
                </select>
                </label>
            </div>


            <button type="button" onClick={handleSaveProfile}>
                Save profile
            </button>
        </div>
    );
}

export default ProfilePage;


