import { useEffect, useState } from 'react';

function TimerPage() {
    const [seconds, setSeconds] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

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
        <div>
            <h1>Timer Page</h1>
            <p>Seconds: {seconds}</p>

            <button type="button" onClick={() => setSeconds(seconds + 10)}>
                Add 10 seconds
            </button>

            <button
                type="button"
                onClick={() => {
                    setSeconds(60);
                    setIsRunning(false);
                }}>
                Reset
            </button>

            <button type="button" onClick={() => setIsRunning(true)}>
                Start timer
            </button>

            <button type="button" onClick={() => setIsRunning(false)}>
                Pause
            </button>
        </div>
    );
}

export default TimerPage;

