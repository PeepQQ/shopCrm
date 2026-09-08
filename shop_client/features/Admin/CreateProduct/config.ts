import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().required(),
  cost: yup.number().required(),
  count: yup.number().optional().default(0),
});

export type CreateProductData = yup.InferType<typeof createProductSchema>;

type field = {
  name: keyof CreateProductData;
  type: string;
  label: string;
};

export const createProductFields: field[] = [
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
  {
    name: "count",
    type: "number",
    label: "Количество(Необязатально)",
  },
];
