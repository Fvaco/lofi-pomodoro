import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { IconButton } from '../IconButton';

type Props = {
    isMuted: boolean;
    onPress: () => void;
    isDisabled?: boolean;
};

export function MuteButton({ isMuted, onPress, isDisabled = false }: Props) {
    return (
        <IconButton
            IconComponent={isMuted ? FaVolumeMute : FaVolumeUp}
            onPress={onPress}
            isDisabled={isDisabled}
        />
    );
}
