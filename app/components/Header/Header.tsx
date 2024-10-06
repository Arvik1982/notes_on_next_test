import styles from "./header.module.css";

type TProps = {
  title?: string;
};
export default function Header({ title = "Список заметок" }: TProps) {
  return (
    <header className={styles.header__container}>
      <h1 className={styles.header__container_title}>{title}</h1>
    </header>
  );
}
