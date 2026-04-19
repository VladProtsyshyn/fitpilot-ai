const assetBase = import.meta.env.BASE_URL;

export const showcaseItems = [
    {
        image: `${assetBase}profile-card.png`,
        title: 'Profile',
        description: 'Create your personal fitness profile and define your health goals.',
    },
    {
        image: `${assetBase}dashboard-card.png`,
        title: 'Dashboard',
        description: 'Review your daily progress, nutrition summary, and recent activity.',
    },
    {
        image: `${assetBase}calculator-card.png`,
        title: 'Calculator',
        description: 'Check BMI, daily calories, and recommendations based on your profile.',
    },
    {
        image: `${assetBase}timer-card.png`,
        title: 'Timer',
        description: 'Use presets and countdown sessions to stay focused during workouts.',
    },
    {
        image: `${assetBase}meals-card.png`,
        title: 'Meals',
        description: 'Organize your meals, keep a simple plan, and stay consistent each day.',
    },
    {
        image: `${assetBase}analyzer-card.png`,
        title: 'Analyzer',
        description: 'Upload food visuals and connect them with your nutrition tracking flow.',
    },
];
