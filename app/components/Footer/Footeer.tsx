import Link from "next/link";
import styles from "./footer.module.css";
import AddIcon from "../Icons/AddSvg";

export default function Footer() {
  return (
    <footer className={styles.footer__container}>
      <Link href={"/notes/new"} className={styles.footer__container_add}>
        <AddIcon />
      </Link>
    </footer>
  );
}
