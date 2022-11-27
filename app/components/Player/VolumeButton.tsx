import { FaVolumeMute, FaVolumeOff } from 'react-icons/fa';

type Props = {
    isPlaying: boolean;
    onPress: () => void;
};

export function VolumeButton({ isPlaying, onPress }: Props) {
    return (
        <button onClick={onPress}>
            {isPlaying ? <FaVolumeOff /> : <FaVolumeMute />}
        </button>
    );
}
