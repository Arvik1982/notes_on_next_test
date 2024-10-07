"use client";

import Link from "next/link";
import styles from "./footer.module.css";
import AddIcon from "../Icons/AddSvg";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export default function Footer() {
  const { scrollY } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollPos = window.innerHeight + latest;
    const maxScroll = document.body.scrollHeight;

    if (currentScrollPos >= maxScroll - 100) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  });

  return (
    <footer className={styles.footer__container}>
      <Link
        id="link"
        href={"/notes/new"}
        className={styles.footer__container_add}
      >
        {isAtBottom && (
          <h3 className={styles.footer__container_title}>Добавить заметку</h3>
        )}

        <AddIcon />
      </Link>
    </footer>
  );
}
