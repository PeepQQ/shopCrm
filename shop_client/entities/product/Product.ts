export interface Product {
  id: number;
  cost: number;
  count: number;
  panelId: number;
  name: string;
}

export const productFieldsTranslation = {
  id: "id",
  cost: "Цена",
  count: "Кол-во",
  name: "Название",
};
