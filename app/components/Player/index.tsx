'use client';

import { useEffect, useRef, useState } from 'react';
import { FaLink, FaCheckCircle } from 'react-icons/fa';
import YouTube, { type YouTubePlayer, type YouTubeEvent } from 'react-youtube';

import { IconButton } from '../IconButton';
import { MuteButton } from './MuteButton';

const DEFAULT_VIDEO_ID = 'Rxx8CK_JhKU';

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

export function Player({ isPlaying, volume = 100 }: Props) {
    const [glowColor, setGlowColor] = useState<string>(getRandomGlowColor());
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const playerRef = useRef<YouTubePlayer | null>(null);
    const videoLinkInputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<any>(null);

    const setPlaying = (shouldPlay: boolean) => {
        if (!playerRef.current) return;
        const player = playerRef.current;
        clearInterval(intervalRef.current);
        if (shouldPlay) {
            player.playVideo();
            const interval = setInterval(() => {
                setGlowColor(getRandomGlowColor());
            }, 2000);
            intervalRef.current = interval;
            return;
        }
        player.pauseVideo();
    };

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
    };

    useEffect(() => {
        if (!playerRef.current) return;
        playerRef.current.setVolume(volume);
        setPlaying(isPlaying);
    }, [isPlaying, volume, playerRef.current]);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-lg flex justify-center items-center gap-2 mb-4">
                <input
                    ref={videoLinkInputRef}
                    type="text"
                    className="w-64 text-center px-2 py-1 text-sm font-bold bg-slate-800 border-2 border-slate-600 rounded-full text-slate-100 placeholder-slate-400"
                    placeholder="Link de YouTube..."
                />
                <IconButton
                    IconComponent={FaCheckCircle}
                    onPress={setVideoLink}
                ></IconButton>
            </div>

            <div>
                {isPlaying && (
                    <div
                        className={`transition-all duration-500 w-20 h-20 absolute self-center shadow-md rounded-full overflow-hidden animate-spin-slow ${glowColor}`}
                    ></div>
                )}

                <YouTube
                    className="flex items-center justify-center box-content pointer-events-none border-white border-2 border-opacity-60 transition rounded-full overflow-hidden w-20 h-20"
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
            </div>
            <div className="flex gap-2 py-2 text-base">
                <MuteButton
                    isMuted={isMuted}
                    onPress={toggleIsMuted}
                    isDisabled={!isPlaying}
                />
            </div>
        </div>
    );
}
