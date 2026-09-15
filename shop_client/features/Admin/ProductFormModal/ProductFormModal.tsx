"use сlient";
import { Button } from "@/shared/components/Button";
import styles from "./ProductFormModal.module.scss";
import { Input } from "@/shared/components/Input";
import {
  Modal,
  ModalActions,
  ModalHeader,
  ModalContent,
} from "@/shared/components/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ProductFormData,
  productFormSchema,
  productFormFields,
} from "./config";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProduct, updateProduct } from "@/shared/api/client/Product.api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Product } from "@/entities/product";

interface ProductFormModalProps {
  children: React.ReactNode;
  isEdit?: boolean;
  editData?: Product;
}

export const ProductFormModal = ({
  children,
  isEdit,
  editData,
}: ProductFormModalProps) => {
  const modalTitle = isEdit ? "Редактирование товара" : "Новый товар";
  const router = useRouter();
  const { panelId } = useParams<{ panelId: string }>();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productFormSchema),
  });

  const handleData = async (data: ProductFormData) => {
    const postData = { ...data, panelId: Number(panelId) };
    try {
      await (isEdit ? updateProduct : createProduct)(postData);
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
          <h3>{modalTitle}</h3>
        </ModalHeader>
        <ModalContent>
          <div className={styles.form}>
            {productFormFields.map((field) => (
              <label key={field.name}>
                <span>{field.label}</span>
                <Input
                  defaultValue={editData?.[field.name]}
                  {...register(field.name)}
                />
              </label>
            ))}
          </div>
        </ModalContent>
        <ModalActions>
          <Button onClick={handleSubmit(handleData)} fullWidth>
            Подтвердить
          </Button>
        </ModalActions>
      </Modal>
      <button onClick={() => setIsOpen(true)}>{children}</button>
    </>
  );
};
