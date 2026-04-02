export function saveProfileToStorage(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
}

export function getProfileFromStorage() {
    const profile = localStorage.getItem('profile');

    return profile ? JSON.parse(profile) : null;
}

export function saveMealsToStorage(meals) {
    localStorage.setItem('meals', JSON.stringify(meals));
}

export function getMealsFromStorage() {
    const meals = localStorage.getItem('meals');

    return meals ? JSON.parse(meals) : null;
}
