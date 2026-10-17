import { IconProps } from '@/global/interfaces';

const Calendar: React.FC<IconProps> = ({ size, ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            {...rest}
        >
            <path d="M19 4h-1V3c0-.6-.4-1-1-1s-1 .4-1 1v1H8V3c0-.6-.4-1-1-1s-1 .4-1 1v1H5C3.3 4 2 5.3 2 7v12c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3zM5 6h14c.6 0 1 .4 1 1v2H4V7c0-.6.4-1 1-1zm14 14H5c-.6 0-1-.4-1-1v-8h16v8c0 .6-.4 1-1 1z"/>
            <path d="M7 15h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zM7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
        </svg>
    );
};

export default Calendar;
