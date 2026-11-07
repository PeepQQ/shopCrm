import Link from "next/link";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}></div>
      <nav className={styles.navigation}>
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>
            <Link href={""}>Главная</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link href={""}>Главная</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link href={""}>Главная</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link href={""}>Главная</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
