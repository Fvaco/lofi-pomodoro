'use client';
import { useState } from 'react';
import { Player } from './components/Player';
import { Timer } from './components/Timer';

export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    return (
        <div className="text-center">
            <Player />
            <Timer />
            <div>
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="bg-blue-500 hover:bg-blue-700 text-blue-100 font-bold py-2 px-4 rounded"
                >
                    {isRunning ? 'Parar' : 'Empezar'}
                </button>
            </div>
        </div>
    );
}
