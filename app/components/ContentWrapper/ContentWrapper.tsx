import { ReactNode } from "react";
import styles from "./contentWrapper.module.css";

export default function ContentWrapper({ children }: { children: ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}
