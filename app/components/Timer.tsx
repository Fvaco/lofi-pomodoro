import { useEffect, useRef, useState } from 'react';

const getFormattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

type Props = {
    isRunning: boolean;
    time: number;
    setTime: (newTime: number) => void;
    onTimeUp: () => void;
    stopOnTimeUp?: boolean;
};

export function Timer({
    isRunning,
    time,
    setTime,
    onTimeUp,
    stopOnTimeUp = false,
}: Props) {
    const intervalRef = useRef<any>(null);

    const pauseTimer = () => clearInterval(intervalRef.current);

    useEffect(() => {
        if (!isRunning) return pauseTimer;

        const newTime = time - 1;
        if (newTime < 0) {
            onTimeUp();
            if (stopOnTimeUp) return pauseTimer;
        }
        intervalRef.current = setInterval(() => {
            setTime(newTime);
        }, 1000);

        return pauseTimer;
    }, [time, isRunning, stopOnTimeUp, setTime, onTimeUp]);

    return <div className="text-9xl">{getFormattedTime(time)}</div>;
}
