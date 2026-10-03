import * as yup from "yup";

export const productFormSchema = yup.object().shape({
  name: yup.string().required(),
  cost: yup.number().required(),
});

export type ProductFormData = yup.InferType<typeof productFormSchema>;

type field = {
  name: keyof ProductFormData;
  type: string;
  label: string;
};

export const productFormFields: field[] = [
  {
    name: "name",
    type: "text",
    label: "Наименование",
  },
  {
    name: "cost",
    type: "number",
    label: "Цена",
  },
];
