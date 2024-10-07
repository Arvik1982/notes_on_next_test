import { ReactNode } from "react";
import styles from "./layout.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className={styles.page__container_auth}>{children}</main>;
}
