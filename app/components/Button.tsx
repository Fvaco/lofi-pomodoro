import { IconType } from 'react-icons';

type Props = {
    children: React.ReactNode;
    onClick: () => void;
    variant?: Variants;
    isDisabled?: boolean;
};
type Variants = 'primary' | 'danger' | 'info';

const variantsClasses: Record<Variants, string> = {
    primary:
        'border-emerald-400 text-emerald-400 hover:shadow-emerald-500 active:shadow-emerald-500',
    danger: 'border-amber-400 text-amber-400 hover:shadow-amber-500 active:shadow-amber-500',
    info: 'border-sky-400 text-sky-400 hover:shadow-sky-500 active:shadow-sky-500',
};

export function Button({
    children,
    onClick,
    isDisabled = false,
    variant = 'primary',
}: Props) {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`
                bg-transparent
                transition-all
                duration-200
                font-bold
                py-2
                px-8
                border-2
                rounded-full
                hover:shadow-sm
                active:shadow-md
                ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
                ${variantsClasses[variant]}
            `}
        >
            {children}
        </button>
    );
}
