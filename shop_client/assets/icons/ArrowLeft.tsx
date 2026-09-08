import type { IconProps } from "./type";

export const ArrowLeftIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      {...props}
    >
      <path
        d="M8 15L1 8L8 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
