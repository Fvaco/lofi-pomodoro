'use client';
import { useState } from 'react';
import { Button } from './components/Button';
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
    const onPhaseTimeUp = () => {
        const isEndOfSequence = phaseIdx === POMODORO_SEQUENCE.length - 1;
        const newPhaseIdx = isEndOfSequence ? 0 : phaseIdx + 1;
        const bellSound = new Audio('/bell.mp3');
        bellSound.play();
        setPhaseIdx(newPhaseIdx);
        setTime(POMODORO_DURATION[POMODORO_SEQUENCE[newPhaseIdx]]);
    };

    return (
        <div className="flex flex-col gap-8 text-center">
            <Player isPlaying={isRunning && !isBreak} />
            <Timer
                isRunning={isRunning}
                time={time}
                setTime={setTime}
                onTimeUp={onPhaseTimeUp}
            />
            <div className="flex gap-5 items-center justify-center">
                <Button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Pausar' : 'Empezar'}
                </Button>
                {!isRunning && (
                    <Button onClick={resetTimer} variant="info">
                        Reiniciar
                    </Button>
                )}
            </div>
        </div>
    );
}
