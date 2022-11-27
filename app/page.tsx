'use client';
import { useState } from 'react';
import { Player } from './components/Player';
import { Timer } from './components/Timer';

export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    return (
        <div className="text-center">
            <Player isPlaying={isRunning} />
            <Timer />
            <div>
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
            </div>
        </div>
    );
}
