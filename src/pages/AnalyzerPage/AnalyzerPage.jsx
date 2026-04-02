import { useState } from 'react';
import './AnalyzerPage.css';

function AnalyzerPage() {
    const [showResult, setShowResult] = useState(false);
    const [fileName, setFileName] = useState('');

    return (
        <div className="analyzer-page">
            <h1>AI Food Analyzer</h1>
            <p>Upload a food image and get a simple nutrition insight.</p>

            <div className="analyzer-actions">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const file = event.target.files?.[0];
                        setFileName(file ? file.name : '');
                        setShowResult(false);
                    }}
                />

                <p>Selected file: {fileName || 'No file selected'}</p>

                <button
                    type="button"
                    onClick={() => setShowResult(true)}
                    disabled={!fileName}
                >
                    Analyze image
                </button>
            </div>

            {showResult && (
                <div className="analyzer-card">
                    <p>Detected meal: Chicken salad</p>
                    <p>Estimated calories: 420 kcal</p>
                    <p>Recommendation: Good option for a balanced meal.</p>
                </div>
            )}
        </div>
    );
}

export default AnalyzerPage;