import { IconType } from 'react-icons';

type Props = {
    IconComponent: IconType;
    onPress: (args: any) => void;
    isDisabled?: boolean;
};

export function IconButton({
    IconComponent,
    onPress,
    isDisabled = false,
}: Props) {
    return (
        <button
            disabled={isDisabled}
            className={` text-slate-200 hover:text-white active:text-slate-300 ${
                isDisabled && 'opacity-50'
            } `}
            onClick={onPress}
        >
            <IconComponent />
        </button>
    );
}
