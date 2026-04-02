import { useEffect, useState } from 'react';
import './TimerPage.css';

function TimerPage() {
    const [seconds, setSeconds] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

    const setPreset = (value) => {
        setSeconds(value);
        setIsRunning(false);
    };

    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const remainingSeconds = String(seconds % 60).padStart(2, '0');

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const timerId = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds <= 1) {
                    setIsRunning(false);
                    return 0;
                }

                return prevSeconds - 1;
                });
        }, 1000);

        return () => clearInterval(timerId);
    }, [isRunning]);

    return (
        <div className="timer-page">
            <h1>Timer Page</h1>
            <p>Use quick presets, stay focused, and track each countdown with a simple workout timer.</p>

            <div className="timer-card">
                <p className="timer-value">
                    {minutes}:{remainingSeconds}
                </p>
                <p className="timer-status">
                    Status: {isRunning ? 'Running' : 'Paused'}
                </p>
                {seconds === 0 && <p className="timer-finished">Timer finished!</p>}
            </div>

            <div className="timer-actions">
                <button type="button" onClick={() => setPreset(30)}>
                    30 sec
                </button>

                <button type="button" onClick={() => setPreset(60)}>
                    60 sec
                </button>

                <button type="button" onClick={() => setPreset(90)}>
                    90 sec
                </button>
            </div>

            <div className="timer-actions">
                <button type="button" onClick={() => setSeconds(seconds + 10)}>
                    Add 10 seconds
                </button>

                <button
                    type="button"
                    onClick={() => {
                    setSeconds(60);
                    setIsRunning(false);
                    }}
                >
                    Reset
                </button>

                <button type="button" onClick={() => setIsRunning(true)}>
                    Start timer
                </button>

                <button type="button" onClick={() => setIsRunning(false)}>
                    Pause
                </button>
            </div>
        </div>
    );
}

export default TimerPage;
