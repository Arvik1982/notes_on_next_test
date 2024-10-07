"use client";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import Cookies from "js-cookie";

type TProps = {
  title?: string;
};
export default function Header({ title = "Список заметок" }: TProps) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const cookieUser = Cookies.get("name");
    setUser(cookieUser || null);
  }, []);

  return (
    <header className={styles.header__container}>
      <p>{user ? `Привет, ${user} !` : "Добро пожаловать!"}</p>
      <h1 className={styles.header__container_title}>{title}</h1>
    </header>
  );
}
