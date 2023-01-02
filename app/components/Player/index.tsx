'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import YouTube, { type YouTubePlayer, type YouTubeEvent } from 'react-youtube';
import { Button } from '../Button';

import { MuteButton } from './MuteButton';
import { fadeVolume } from './utils/fadeVolume';

const DEFAULT_VIDEO_ID = 'jfKfPfyJRdk'; // lofi-girl live

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

type Props = {
    isPlaying: boolean;
    volume?: number;
};

export function Player({ isPlaying, volume = 80 }: Props) {
    const [glowColor, setGlowColor] = useState<string>(getRandomGlowColor());
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isLinkChangeActive, setIsLinkChangeActive] =
        useState<boolean>(false);
    const playerRef = useRef<YouTubePlayer | null>(null);
    const videoLinkInputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<any>(null);

    const setPlaying = useCallback(
        (shouldPlay: boolean) => {
            if (!playerRef.current) return;
            const player = playerRef.current;
            clearInterval(intervalRef.current);
            if (shouldPlay) {
                player.playVideo();
                fadeVolume(player, volume);
                const interval = setInterval(() => {
                    setGlowColor(getRandomGlowColor());
                }, 2000);
                intervalRef.current = interval;
                return;
            }
            fadeVolume(player, 0).then(() => player.pauseVideo());
        },
        [playerRef, volume]
    );

    const onPlayerReady = (event: YouTubeEvent) => {
        playerRef.current = event.target;
        setIsMuted(playerRef.current.isMuted());
    };
    const toggleIsMuted = () => {
        if (!playerRef.current) return;
        const player = playerRef.current;
        const isPlayerMuted = player.isMuted();
        isPlayerMuted ? player.unMute() : player.mute();

        setIsMuted(!isPlayerMuted);
    };

    const setVideoLink = () => {
        if (!playerRef.current) return;
        const player = playerRef.current;
        const videoLink = videoLinkInputRef.current?.value;
        if (!videoLink) return;
        const url = new URL(videoLink);
        const videoId = url.searchParams.get('v');
        player.loadVideoById(videoId);
        if (!isPlaying) player.pauseVideo();
        setIsLinkChangeActive(false);
    };

    useEffect(() => {
        if (!playerRef.current) return;
        setPlaying(isPlaying);
    }, [isPlaying, volume, setPlaying]);

    return (
        <div className="flex flex-col justify-center items-center p-5">
            <div className="flex justify-center items-start pl-2">
                <button
                    className="relative flex justify-center items-center"
                    onClick={() => {
                        setIsLinkChangeActive((prev) => !prev);
                    }}
                >
                    {isPlaying && (
                        <div
                            className={`absolute 
                        transition-all duration-500 w-20 h-20 box-content shadow-md rounded-full animate-spin-slow
                        border-white border-2
                        
                        ${glowColor}`}
                        ></div>
                    )}

                    <YouTube
                        className={`
                    flex items-center justify-center 
                    box-content 
                    pointer-events-none 
                    rounded-full 
                    overflow-hidden
                    ${!isPlaying ? 'border-slate-500 border-2' : ''}
                    w-20 h-20`}
                        videoId={DEFAULT_VIDEO_ID}
                        opts={{
                            width: 150,
                            height: 150,
                            playerVars: {
                                loop: 1,
                            },
                        }}
                        onReady={onPlayerReady}
                    ></YouTube>
                </button>

                <div>
                    <MuteButton
                        isMuted={isMuted}
                        onPress={toggleIsMuted}
                        isDisabled={!isPlaying}
                    />
                </div>
            </div>

            <div
                className={`
                transition-all duration-300 pl-8
                flex text-lg justify-center items-center gap-2
                    ${
                        isLinkChangeActive
                            ? 'mt-5'
                            : 'mt-0 pointer-events-none opacity-0 blur-md'
                    }
                `}
            >
                <input
                    ref={videoLinkInputRef}
                    type="text"
                    className="w-64 outline-none px-4 py-1 text-sm font-bold bg-slate-800 border-2 border-slate-600 focus:border-slate-300 rounded-full text-slate-100 placeholder-slate-400"
                    placeholder="Link de YouTube..."
                />
                <Button onClick={setVideoLink} size="sm">
                    <FaCheck />
                </Button>
            </div>
        </div>
    );
}
