import styles from "./GroupTable.module.scss";
import { Table, Tbody, Thead, Tr, Th, Td } from "@/shared/components/Table";
import { Product, productFieldsTranslation } from "@/entities/product";

export type GroupTableFields = "id" | "name" | "cost" | "count";

interface GroupTableProps {
  fields: GroupTableFields[];
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
              <Th key={field}>{productFieldsTranslation[field]}</Th>
            ))}
            {actions && <Th colSpan={1}>Действия</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              {fields.map((field) => (
                <Td key={`${field}${product.id}`}>{product[field]}</Td>
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
