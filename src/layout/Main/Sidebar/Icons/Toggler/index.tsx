
import { IconProps } from '@/global/interfaces';

const Toggler: React.FC<IconProps> = ({ size, rotate = 0, ...rest }) => {

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
            width={size}
            height={size}
            fill="currentColor"
            {...rest}   
            transform={"rotate("+ rotate +")"}
        >
            <path d="M472,16H40A24.028,24.028,0,0,0,16,40V200H48V48H464V464H48V304H16V472a24.028,24.028,0,0,0,24,24H472a24.028,24.028,0,0,0,24-24V40A24.028,24.028,0,0,0,472,16Z"/>
            <polygon points="209.377 363.306 232.004 385.933 366.627 251.31 232.004 116.687 209.377 139.313 305.374 235.311 16 235.311 16 267.311 305.372 267.311 209.377 363.306"/>
        </svg>
    );
};

export default Toggler;