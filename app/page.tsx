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

const getNextPhaseIdx = (currentPhaseIdx: number) => {
    const isEndOfSequence = currentPhaseIdx === POMODORO_SEQUENCE.length - 1;
    return isEndOfSequence ? 0 : currentPhaseIdx + 1;
};

export default function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [isPhaseStarted, setIsPhaseStarted] = useState(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [phaseIdx, setPhaseIdx] = useState<PomodoroPhases>(0);
    const [time, setTime] = useState<number>(
        POMODORO_DURATION[PomodoroPhases.Focus]
    );

    const resetTimer = () => {
        setIsRunning(false);
        setIsPhaseStarted(false);
        setTime(POMODORO_DURATION[POMODORO_SEQUENCE[phaseIdx]]);
    };

    const moveToNextPhase = () => {
        const nextPhaseIdx = getNextPhaseIdx(phaseIdx);
        setPhaseIdx(nextPhaseIdx);
        setTime(POMODORO_DURATION[POMODORO_SEQUENCE[nextPhaseIdx]]);
    };
    const onPhaseTimeUp = async () => {
        moveToNextPhase();
        playBellSound();
    };

    const isBreak = [
        PomodoroPhases.ShortBreak,
        PomodoroPhases.LongBreak,
    ].includes(POMODORO_SEQUENCE[phaseIdx]);

    const isLastPhase = phaseIdx === POMODORO_SEQUENCE.length - 1;
    const isFirstPhase = phaseIdx === 0;
    const canMoveToNext = !isRunning && hasStarted;
    const canMoveToPrevious = !isRunning && hasStarted && !isPhaseStarted;
    const canResetPhase = !isRunning && hasStarted && isPhaseStarted;

    return (
        <>
            <div className="relative h-screen w-screen flex items-center justify-center">
                <div className="absolute top-4">
                    <Player isPlaying={isRunning && !isBreak} />
                </div>
                <div className="flex flex-col gap-8 text-center">
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
                        {canResetPhase && (
                            <Button onClick={resetTimer} variant="danger">
                                {isPhaseStarted && <FaUndo />}
                            </Button>
                        )}
                        {canMoveToPrevious && (
                            <Button
                                onClick={() => {
                                    setTime(
                                        POMODORO_DURATION[
                                            POMODORO_SEQUENCE[phaseIdx - 1]
                                        ]
                                    );
                                    setPhaseIdx(phaseIdx - 1);
                                }}
                                isDisabled={isFirstPhase}
                                variant="danger"
                            >
                                <FaArrowLeft />
                            </Button>
                        )}

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

                        {canMoveToNext && (
                            <Button
                                onClick={() => {
                                    moveToNextPhase();
                                    setIsPhaseStarted(false);
                                }}
                                isDisabled={isLastPhase}
                                variant="info"
                            >
                                <FaArrowRight />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
