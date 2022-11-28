'use client';
import { useState } from 'react';
import { Player } from './components/Player';
import { Timer } from './components/Timer';
import {
    PomodoroPhases,
    POMODORO_DURATION,
    POMODORO_SEQUENCE,
} from './constants';

export default function App() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [phaseIdx, setPhaseIdx] = useState<PomodoroPhases>(0);
    const [time, setTime] = useState<number>(
        POMODORO_DURATION[PomodoroPhases.Focus]
    );

    const isBreak = [
        PomodoroPhases.ShortBreak,
        PomodoroPhases.LongBreak,
    ].includes(POMODORO_SEQUENCE[phaseIdx]);

    const resetTimer = () => {
        setIsRunning(false);
        setPhaseIdx(0);
        setTime(POMODORO_DURATION[POMODORO_SEQUENCE[0]]);
    };
    const onPhaseUp = () => {
        const newPhaseIdx = phaseIdx + 1;
        const isEndOfSequence = newPhaseIdx >= POMODORO_SEQUENCE.length;
        isEndOfSequence ? setPhaseIdx(0) : setPhaseIdx(newPhaseIdx);
        const bellSound = new Audio('/bell.mp3');
        bellSound.play();
        setTime(POMODORO_DURATION[POMODORO_SEQUENCE[newPhaseIdx]]);
    };

    return (
        <div className="flex flex-col gap-8 text-center">
            <Player isPlaying={isRunning} volume={isBreak ? 10 : 100} />
            <Timer
                isRunning={isRunning}
                time={time}
                setTime={setTime}
                onTimeUp={onPhaseUp}
            />
            <div className="flex gap-5 items-center justify-center">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="
                    bg-transparent
                    transition-all
                    duration-200
                    border-emerald-400
                    text-emerald-400 
                    border-2
                    hover:shadow-sm 
                    hover:shadow-emerald-500
                    active:shadow-md
                    active:shadow-emerald-500
                    font-bold 
                    py-2 
                    px-8 
                    rounded-full"
                >
                    {isRunning ? 'Pausar' : 'Empezar'}
                </button>
                <button
                    onClick={resetTimer}
                    className="
                    bg-transparent
                    transition-all
                    duration-200
                    border-sky-400
                    text-sky-400 
                    border-2
                    hover:shadow-sm 
                    hover:shadow-sky-500
                    active:shadow-md
                    active:shadow-sky-500
                    font-bold 
                    py-2 
                    px-8 
                    rounded-full"
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
}
