"use client";
import { Input } from "@/shared/components/Input";
import styles from "./InviteUserConfirmForm.module.scss";
import {
  InviteUserConfirmFormData,
  inviteUserConfirmFormSchema,
} from "./config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/shared/components/Button";
import { inviteUserConfirm } from "@/shared/api/client";
import { notify } from "@/shared/utils";
import { useRouter } from "next/navigation";

export const InviteUserConfirmForm = ({
  token,
  redirectUrl,
}: {
  token: string;
  redirectUrl?: string;
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(inviteUserConfirmFormSchema),
  });

  const handleConfirm = async (data: InviteUserConfirmFormData) => {
    try {
      await inviteUserConfirm({ token, ...data });
      router.push(redirectUrl || "/");
    } catch (err) {
      notify.apiError(err);
    }
  };

  return (
    <div className={styles.inviteUserConfirmForm}>
      <Input label="Придумайте имя" {...register("name")} />
      <Input label="Придумайте пароль" {...register("password")} />
      <Button onClick={handleSubmit(handleConfirm)}>Подтвердить</Button>
    </div>
  );
};
