import styles from "./GraphTooltip.module.scss";

export const GraphTooltip = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.graphTooltip}>{children}</div>;
};
