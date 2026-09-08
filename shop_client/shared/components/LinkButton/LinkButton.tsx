"use client";
import { Button } from "../Button";
import { useRouter } from "next/navigation";
import type { ButtonProps } from "../Button";

type LinkButtonProps = ButtonProps & {
  href: string;
  target?: string;
};

export const LinkButton = ({
  href,
  children,
  target,
  ...rest
}: LinkButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (target === "_blank") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(href);
  };

  return (
    <Button onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
};
