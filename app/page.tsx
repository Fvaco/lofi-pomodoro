'use client';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUndo } from 'react-icons/fa';
import { VscDebugStepOver } from 'react-icons/vsc';
import { Button } from './components/Button';
import { Player } from './components/Player';
import { Timer } from './components/Timer';
import {
    PomodoroPhases,
    POMODORO_DURATION,
    POMODORO_SEQUENCE,
} from './constants';
import { playBellSound } from './utils/playBellSound';
import { wait } from './utils/wait';

export default function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [isPhaseStarted, setIsPhaseStarted] = useState(false);
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
        setIsPhaseStarted(false);
        setTime(POMODORO_DURATION[POMODORO_SEQUENCE[phaseIdx]]);
    };
    // nextPhase
    const moveToNextPhase = () => {
        const isEndOfSequence = phaseIdx === POMODORO_SEQUENCE.length - 1;
        const newPhaseIdx = isEndOfSequence ? 0 : phaseIdx + 1;
        const nextPhase = POMODORO_SEQUENCE[newPhaseIdx];

        setPhaseIdx(newPhaseIdx);
        setTime(POMODORO_DURATION[POMODORO_SEQUENCE[newPhaseIdx]]);
        return nextPhase;
    };
    const onPhaseTimeUp = async () => {
        const nextPhase = moveToNextPhase();
        if (nextPhase === PomodoroPhases.Focus) await wait(1000);
        playBellSound();
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
                {!hasStarted && (
                    <Button
                        onClick={() => {
                            setIsRunning(true);
                            setHasStarted(true);
                            setIsPhaseStarted(true);
                        }}
                    >
                        Empezar
                    </Button>
                )}
                {!isRunning &&
                    hasStarted &&
                    (isPhaseStarted ? (
                        <Button
                            onClick={resetTimer}
                            variant="danger"
                            className="px-2 "
                        >
                            {isPhaseStarted && <FaUndo />}
                        </Button>
                    ) : (
                        phaseIdx > 0 && (
                            <Button
                                onClick={() => {
                                    setTime(
                                        POMODORO_DURATION[
                                            POMODORO_SEQUENCE[phaseIdx - 1]
                                        ]
                                    );
                                    setPhaseIdx(phaseIdx - 1);
                                }}
                                variant="danger"
                                className="px-2 "
                            >
                                {!isPhaseStarted && phaseIdx > 0 && (
                                    <FaArrowLeft />
                                )}
                            </Button>
                        )
                    ))}
                {hasStarted && (
                    <Button
                        onClick={() => {
                            setIsRunning(!isRunning);
                            setIsPhaseStarted(true);
                        }}
                    >
                        {isRunning ? 'Pausar' : 'Seguir'}
                    </Button>
                )}
                {!isRunning && hasStarted && (
                    <Button
                        onClick={() => {
                            moveToNextPhase();
                            setIsPhaseStarted(false);
                        }}
                        variant="info"
                        className="px-2"
                    >
                        <FaArrowRight />
                    </Button>
                )}
            </div>
        </div>
    );
}
