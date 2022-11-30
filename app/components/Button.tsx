type Variants = 'primary' | 'danger' | 'info';
type Sizes = 'sm' | 'md' | 'lg';

type Props = {
    children: React.ReactNode;
    onClick: () => void;
    variant?: Variants;
    isDisabled?: boolean;
    size?: Sizes;
};

const variantsClasses: Record<Variants, string> = {
    primary:
        'border-emerald-400 text-emerald-400 hover:shadow-emerald-500 active:shadow-emerald-500',
    danger: 'border-amber-400 text-amber-400 hover:shadow-amber-500 active:shadow-amber-500',
    info: 'border-sky-400 text-sky-400 hover:shadow-sky-500 active:shadow-sky-500',
};
const sizesClasses: Record<Sizes, string> = {
    sm: 'py-2 px-4 text-xs',
    md: 'py-2 px-6',
    lg: 'py-2 px-8 text-xl',
};

export function Button({
    children,
    onClick,
    isDisabled = false,
    variant = 'primary',
    size = 'md',
}: Props) {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`
                bg-transparent
                transition-all
                duration-200
                bg-slate-800
                font-bold
                border-2
                rounded-full
                hover:shadow-sm
                active:shadow-md
                ${isDisabled ? 'opacity-30 pointer-events-none' : ''}
                ${sizesClasses[size]}
                ${variantsClasses[variant]}
            `}
        >
            {children}
        </button>
    );
}
