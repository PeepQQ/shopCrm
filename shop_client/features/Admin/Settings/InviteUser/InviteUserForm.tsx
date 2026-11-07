"use client";
import { Input } from "@/shared/components/Input";
import styles from "./InviteUserForm.module.scss";
import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { validateEmail } from "@/shared/utils";
import { notify } from "@/shared/utils";
import { inviteUser } from "@/shared/api/client";
import { links } from "@/shared/config/links";

export const InviteUserForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (validateEmail(email)) {
      try {
        await inviteUser({ email, redirectUrl: links.admin.root });
      } catch (err) {
        notify.apiError(err);
      }
      setIsLoading(false);
    } else {
      notify.error("Неверный формат почты");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.inviteUserForm}>
      <div className={styles.field}>
        <Input label="Почта" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button onClick={handleSubmit} disabled={isLoading}>
        Пригласить
      </Button>
    </div>
  );
};
