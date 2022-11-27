import { useEffect, useState } from 'react';

const POMODORO_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 20 * 60;

const getFormattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export function Timer({}) {
    const [time, setTime] = useState(POMODORO_DURATION);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return <div className="text-8xl">{getFormattedTime(time)}</div>;
}
