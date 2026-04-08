import { useState } from 'react';
import { getMealsFromStorage, saveMealsToStorage } from '../../services/storageService';
import './AnalyzerPage.css';

const assetBase = import.meta.env.BASE_URL;

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
            <div className="page-heading">
                <img src={`${assetBase}analyzer-card.png`} alt="Analyzer page icon" />
                <h1>AI Food Analyzer</h1>
            </div>
            <p>Upload a food photo, review the mock nutrition result, and save the entry to your dashboard timeline.</p>

            <div className="analyzer-actions">
                <div className="analyzer-actions-heading">
                    <p>Analyze a meal photo</p>
                    <span>Upload an image, set the entry time, and generate a quick nutrition summary.</span>
                </div>

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

                <p className="analyzer-file-state">Selected file: {fileName || 'No file selected'}</p>

                {imageDataUrl && (
                    <div className="analyzer-preview-card">
                        <p>Preview</p>
                        <img className="analyzer-preview" src={imageDataUrl} alt="Food preview" />
                    </div>
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
                    <p className="analyzer-result-label">Detected meal</p>
                    <p className="analyzer-result-title">{analysis.mealName}</p>
                    <div className="analyzer-metrics">
                        <p>
                            <span>Estimated calories</span>
                            <strong>{analysis.calories} kcal</strong>
                        </p>
                        <p>
                            <span>Protein</span>
                            <strong>{analysis.protein} g</strong>
                        </p>
                        <p>
                            <span>Fat</span>
                            <strong>{analysis.fat} g</strong>
                        </p>
                        <p>
                            <span>Carbs</span>
                            <strong>{analysis.carbs} g</strong>
                        </p>
                    </div>
                    <p className="analyzer-recommendation">Recommendation: {analysis.recommendation}</p>

                    <button type="button" onClick={handleSaveToDashboard}>
                        Save to dashboard
                    </button>

                    {saveMessage && <p className="analyzer-save-message">{saveMessage}</p>}
                </div>
            )}
        </div>
    );
}

export default AnalyzerPage;
