export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}
