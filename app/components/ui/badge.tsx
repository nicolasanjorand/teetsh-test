export default function Badge({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    const colorMap: Record<string, string> = {
        'text-lime-200': 'bg-lime-950',
        'text-lime-300': '',
        'text-lime-400': '',
        'text-lime-500': '',
        'text-lime-600': '',
        'text-lime-700': 'bg-lime-200',
    };

    const matchedText = Object.keys(colorMap).find(text => className.includes(text));
    const bgColor = matchedText ? colorMap[matchedText] : 'bg-white';

    return (
        <span className={`px-2 text-sm py-1 rounded-full ${className}`}>
            {children}
        </span>
    );
}
