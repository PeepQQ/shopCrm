"use сlient";
import { Button } from "@/shared/components/Button";
import styles from "./CreateProductModal.module.scss";
import { Input } from "@/shared/components/Input";
import {
  Modal,
  ModalClose,
  ModalActions,
  ModalHeader,
  ModalContent,
} from "@/shared/components/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateProductData, createProductSchema } from "./config";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductFields } from "./config";
import { createProduct } from "@/shared/api/client/Product.api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const CreateProductModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const param = useParams<{ panelId: string }>();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProductSchema),
  });

  const close = () => {
    setIsOpen(false);
  };

  const handleCreate = async (data: CreateProductData) => {
    const postData = { ...data, panelId: Number(param.panelId) };
    try {
      const res = await createProduct(postData);
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} closeAction={() => setIsOpen(false)}>
        <ModalHeader>
          <h3>Новый товар</h3>
        </ModalHeader>
        <ModalContent>
          <div className={styles.form}>
            {createProductFields.map((field) => (
              <label key={field.name}>
                <span>{field.label}</span>
                <Input {...register(field.name)} />
              </label>
            ))}
          </div>
        </ModalContent>
        <ModalActions>
          <Button onClick={handleSubmit(handleCreate)} fullWidth>
            Подтвердить
          </Button>
        </ModalActions>
      </Modal>
      <button onClick={() => setIsOpen(true)}>{children}</button>
    </>
  );
};
