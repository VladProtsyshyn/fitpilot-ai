export function getDailyCaloriesTarget(profile) {
    const weight = Number(profile.weight);
    const height = Number(profile.height);
    const age = Number(profile.age);

    if (weight <= 0 || height <= 0 || age <= 0) {
        return 2000;
    }

    const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    let target = Math.round(bmr * 1.2);

    if (profile.goal === 'lose weight') {
        target -= 300;
    } else if (profile.goal === 'gain muscle') {
        target += 300;
    }

    return Math.max(target, 1200);
}

export function getMacroTargets(calorieTarget) {
    return {
        protein: Math.round((calorieTarget * 0.3) / 4),
        fat: Math.round((calorieTarget * 0.25) / 9),
        carbs: Math.round((calorieTarget * 0.45) / 4),
    };
}

export function estimateMealNutrition(mealName) {
    const name = mealName.toLowerCase();

    if (name.includes('oatmeal')) {
        return { calories: 320, protein: 12, fat: 7, carbs: 54 };
    }

    if (name.includes('chicken') && name.includes('salad')) {
        return { calories: 420, protein: 35, fat: 18, carbs: 22 };
    }

    if (name.includes('rice')) {
        return { calories: 390, protein: 10, fat: 8, carbs: 68 };
    }

    if (name.includes('salad')) {
        return { calories: 260, protein: 14, fat: 12, carbs: 18 };
    }

    const seed = Math.max(mealName.trim().length, 10);

    return {
        calories: 180 + seed * 8,
        protein: 10 + (seed % 15),
        fat: 6 + (seed % 10),
        carbs: 20 + (seed % 30),
    };
}
