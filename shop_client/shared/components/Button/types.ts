export type ButtonVariant = "primary" | "secondary";

export type ButtonSize = "sm" | "md" | "default" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  size?: ButtonSize;
}
