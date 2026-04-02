export function saveProfileToStorage(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
}

export function getProfileFromStorage() {
    const profile = localStorage.getItem('profile');

    return profile ? JSON.parse(profile) : null;
}
