"use client";
import { LinkButton } from "@/shared/components/LinkButton";
import styles from "./styles.module.scss";
import { links } from "@/shared/config/links";
import { useAppSelector } from "@/shared/hooks";
import { useRouter } from "next/navigation";

export const UserBar = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  return (
    <div className={styles.userBar}>
      {user?.id ? (
        <span
          onClick={() => {
            router.push(links.admin.root);
          }}
        >
          {user.email}
        </span>
      ) : (
        <LinkButton href={links.login}>Вход</LinkButton>
      )}
    </div>
  );
};
