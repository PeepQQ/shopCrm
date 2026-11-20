import styles from "./GroupTable.module.scss";
import { Table, Tbody, Thead, Tr, Th, Td } from "@/shared/components/Table";
import { Product, productFieldsTranslation } from "@/entities/product";

export type GroupTableFieldKeys = "id" | "name" | "cost" | "count";

type GroupTableField = {
  key: GroupTableFieldKeys;
  render?: (product: Product) => void;
};

interface GroupTableProps {
  fields: GroupTableField[];
  products: Product[];
  actions?: (product: Product) => React.ReactNode;
}

export const GroupTable = ({ fields, products, actions }: GroupTableProps) => {
  return (
    <div className={styles.groupTable}>
      <Table className={styles.tableProducts}>
        <Thead>
          <Tr>
            {fields.map((field) => (
              <Th key={field.key}>{productFieldsTranslation[field.key]}</Th>
            ))}
            {actions && <Th colSpan={1}>Действия</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              {fields.map((field) => (
                <Td key={`${field.key}${product.id}`}>
                  {field.render?.(product) || product[field.key]}
                </Td>
              ))}
              {actions && (
                <Td colSpan={1}>
                  <div className={styles.groupTableActions}>
                    {actions(product)}
                  </div>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};
