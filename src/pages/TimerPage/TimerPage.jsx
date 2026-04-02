import { useEffect, useState } from 'react';
import './TimerPage.css';

function TimerPage() {
    const [seconds, setSeconds] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

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

            <div className="timer-card">
                <p>Time: {minutes}:{remainingSeconds}</p>
                <p>Status: {isRunning ? 'Running' : 'Paused'}</p>
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
