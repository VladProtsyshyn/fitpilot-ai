import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../store/slices/profileSlice';

function ProfilePage() {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const name = useSelector((state) => state.profile.name);

    const handleSaveName = () => {
        dispatch(setName(inputValue));
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Name: {name}</p>

            <input
                type="text"
                placeholder="Enter your name"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />

            <button type="button" onClick={handleSaveName}>
                Save name
            </button>
        </div>
    );
}

export default ProfilePage;

