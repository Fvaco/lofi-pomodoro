'use client';

import { useRef, useState } from 'react';
import YouTube, { type YouTubePlayer, type YouTubeEvent } from 'react-youtube';

import { VolumeButton } from './VolumeButton';

const GLOW_COLORS = [
    'shadow-red-500',
    'shadow-orange-500',
    'shadow-amber-500',
    'shadow-yellow-500',
    'shadow-lime-500',
    'shadow-green-500',
    'shadow-emerald-500',
    'shadow-teal-500',
    'shadow-cyan-500',
    'shadow-sky-500',
    'shadow-blue-500',
    'shadow-indigo-500',
    'shadow-violet-500',
    'shadow-purple-500',
    'shadow-fuchsia-500',
    'shadow-pink-500',
    'shadow-rose-500',
];

const getRandomGlowColor = () => {
    return GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)];
};

export function Player() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);
    const [glowColor, setGlowColor] = useState<string>(getRandomGlowColor());
    const intervalRef = useRef<any>(null);

    const togglePlaying = () => {
        clearInterval(intervalRef.current);
        if (!isPlaying) {
            setIsPlaying(true);
            player.playVideo();
            const interval = setInterval(() => {
                setGlowColor(getRandomGlowColor());
            }, 2000);
            intervalRef.current = interval;
            return;
        }
        player.pauseVideo();
        setIsPlaying(false);
    };

    const onPlayerReady = (event: YouTubeEvent) => {
        setPlayer(event.target);
    };

    return (
        <div className="text-center">
            <div className="relative flex items-center justify-center">
                {isPlaying && (
                    <div
                        className={`transition-all duration-500 w-20 h-20 absolute self-center shadow-md rounded-full overflow-hidden animate-spin-slow ${glowColor}`}
                    ></div>
                )}

                <YouTube
                    className="flex items-center justify-center box-content pointer-events-none border-white border-2 border-opacity-60 transition rounded-full overflow-hidden w-20 h-20"
                    videoId="Rxx8CK_JhKU"
                    opts={{
                        width: 150,
                        height: 150,
                        playerVars: {
                            loop: 1,
                        },
                    }}
                    onReady={onPlayerReady}
                ></YouTube>
            </div>

            <div className="p-4 text-3xl">
                <VolumeButton isPlaying={isPlaying} onPress={togglePlaying} />
            </div>
        </div>
    );
}
