import { useEffect, useState } from 'react';
import PageHeading from '../../components/PageHeading/PageHeading';

import './TimerPage.css';

const assetBase = import.meta.env.BASE_URL;

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
            <PageHeading
                image={`${assetBase}timer-card.png`}
                title="Timer Page"
                alt="Timer page icon"
            />
            <p>Use quick presets, stay focused, and track each countdown with a simple workout timer.</p>

            <div className="timer-card">
                <div className="timer-main">
                    <p className="timer-label">Workout countdown</p>
                    <p className="timer-value">
                        {minutes}:{remainingSeconds}
                    </p>
                    <p className="timer-status">
                        Status <span>{isRunning ? 'Running' : 'Paused'}</span>
                    </p>
                    {seconds === 0 && <p className="timer-finished">Timer finished!</p>}
                </div>

                <div className="timer-panel">
                    <div className="timer-actions timer-presets">
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

                    <div className="timer-actions timer-controls">
                        <button
                            type="button"
                            className="timer-secondary"
                            onClick={() => setSeconds(seconds + 10)}
                        >
                            +10 sec
                        </button>

                        <button
                            type="button"
                            className="timer-secondary"
                            onClick={() => {
                                setSeconds(60);
                                setIsRunning(false);
                            }}
                        >
                            Reset
                        </button>

                        <button type="button" className="timer-primary" onClick={() => setIsRunning(true)}>
                            Start
                        </button>

                        <button type="button" className="timer-ghost" onClick={() => setIsRunning(false)}>
                            Pause
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimerPage;
