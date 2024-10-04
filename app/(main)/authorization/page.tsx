import styles from "./page.module.css";
import LoginForm from "../_components/LoginForm/LoginForm";

export default function Authorization() {
  return (
    <section className={styles.page__container_auth}>
      <h1>Вход</h1>
      <LoginForm />
    </section>
  );
}
