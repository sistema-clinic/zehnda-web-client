import { IconProps } from '@/global/interfaces';

const Doc: React.FC<IconProps> = ({ size, ...rest }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 90 112.5"
        fill="currentColor"
        {...rest}
      >
        <polygon
            points="58,90 80,68 58,68 "
            id="polygon1" /><path
            d="M10,0v90h45V65h25V0H10z M67,57H23v-4h44V57z M67,43H23v-4h44V43z M67,29H23v-4h44V29z"
            id="path1" />
      </svg>
    );
  };

  export default Doc;