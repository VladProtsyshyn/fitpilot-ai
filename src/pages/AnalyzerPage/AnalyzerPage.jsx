import { useState } from 'react';
import { getMealsFromStorage, saveMealsToStorage } from '../../services/storageService';
import './AnalyzerPage.css';

const mockAnalysisPresets = [
    {
        keywords: ['oat', 'apple', 'berry', 'breakfast', 'porridge'],
        result: {
            mealName: 'Oatmeal with fruit',
            calories: 420,
            protein: 14,
            fat: 10,
            carbs: 68,
            recommendation: 'Good breakfast option with balanced energy.',
        },
    },
    {
        keywords: ['salad', 'chicken', 'green'],
        result: {
            mealName: 'Chicken salad',
            calories: 390,
            protein: 32,
            fat: 14,
            carbs: 24,
            recommendation: 'High in protein and great for a light meal.',
        },
    },
    {
        keywords: ['egg', 'rice', 'sausage'],
        result: {
            mealName: 'Eggs with rice and sausage',
            calories: 690,
            protein: 21,
            fat: 25,
            carbs: 87,
            recommendation: 'Tasty and filling, but better for a bigger meal.',
        },
    },
];

function getMockAnalysis(fileName) {
    const normalizedName = fileName.toLowerCase();
    const matchedPreset = mockAnalysisPresets.find((preset) =>
        preset.keywords.some((keyword) => normalizedName.includes(keyword)),
    );

    return matchedPreset?.result || {
        mealName: 'Balanced meal bowl',
        calories: 510,
        protein: 24,
        fat: 18,
        carbs: 52,
        recommendation: 'Looks like a balanced meal. Portion control still matters.',
    };
}

function AnalyzerPage() {
    const [fileName, setFileName] = useState('');
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');
    const [saveMessage, setSaveMessage] = useState('');
    const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 10));
    const [entryTime, setEntryTime] = useState(
        new Date().toTimeString().slice(0, 5),
    );

    const handleAnalyzeImage = async () => {
        if (!imageDataUrl) {
            return;
        }

        setIsAnalyzing(true);
        setError('');
        setSaveMessage('');

        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 900);
            });

            setAnalysis(getMockAnalysis(fileName));
        } catch (requestError) {
            setAnalysis(null);
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : 'Failed to analyze image.',
            );
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSaveToDashboard = () => {
        if (!analysis) {
            return;
        }

        const savedMeals = getMealsFromStorage() || [];
        const newEntry = {
            id: Date.now(),
            name: analysis.mealName,
            date: entryDate,
            time: entryTime,
            nutrition: {
                calories: analysis.calories,
                protein: analysis.protein,
                fat: analysis.fat,
                carbs: analysis.carbs,
            },
        };

        saveMealsToStorage([...savedMeals, newEntry]);
        setSaveMessage('Saved to dashboard history.');
    };

    return (
        <div className="analyzer-page">
            <h1>AI Food Analyzer</h1>
            <p>Upload a food image and get a demo nutrition insight.</p>

            <div className="analyzer-actions">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const file = event.target.files?.[0];
                        setFileName(file ? file.name : '');
                        setAnalysis(null);
                        setError('');
                        setSaveMessage('');

                        if (!file) {
                            setImageDataUrl('');
                            return;
                        }

                        const reader = new FileReader();

                        reader.onload = () => {
                            setImageDataUrl(typeof reader.result === 'string' ? reader.result : '');
                        };

                        reader.readAsDataURL(file);
                    }}
                />

                <p>Selected file: {fileName || 'No file selected'}</p>

                {imageDataUrl && (
                    <img className="analyzer-preview" src={imageDataUrl} alt="Food preview" />
                )}

                <label>
                    Entry date
                    <input
                        type="date"
                        value={entryDate}
                        onChange={(event) => setEntryDate(event.target.value)}
                    />
                </label>

                <label>
                    Entry time
                    <input
                        type="time"
                        value={entryTime}
                        onChange={(event) => setEntryTime(event.target.value)}
                    />
                </label>

                <button
                    type="button"
                    onClick={handleAnalyzeImage}
                    disabled={!fileName || isAnalyzing}
                >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze image'}
                </button>
            </div>

            {error && <div className="analyzer-card"><p>{error}</p></div>}

            {analysis && (
                <div className="analyzer-card">
                    <p>Detected meal: {analysis.mealName}</p>
                    <p>Estimated calories: {analysis.calories} kcal</p>
                    <p>Protein: {analysis.protein} g</p>
                    <p>Fat: {analysis.fat} g</p>
                    <p>Carbs: {analysis.carbs} g</p>
                    <p>Recommendation: {analysis.recommendation}</p>

                    <button type="button" onClick={handleSaveToDashboard}>
                        Save to dashboard
                    </button>

                    {saveMessage && <p>{saveMessage}</p>}
                </div>
            )}
        </div>
    );
}

export default AnalyzerPage;
