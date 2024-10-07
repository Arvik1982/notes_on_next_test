'use client'

import Link from "next/link";
import styles from "./footer.module.css";
import AddIcon from "../Icons/AddSvg";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";



export default function Footer() {

  const { scrollY } = useScroll(); // Get the scrollY motion value
    const [isAtBottom, setIsAtBottom] = useState(false);

    // Use motion value event to detect changes in scrollY
    useMotionValueEvent(scrollY, "change", (latest) => {
        const currentScrollPos = window.innerHeight + latest; // Calculate current position
        const maxScroll = document.body.scrollHeight; // Total height of the document

        // Check if scrolled to the bottom
        if (currentScrollPos >= maxScroll-100) {
            setIsAtBottom(true); // User is at the bottom
        } else {
            setIsAtBottom(false); // User is not at the bottom
        }
    });

  return (
    <footer className={styles.footer__container}>
      <Link
        id="link"
        href={"/notes/new"}
        className={styles.footer__container_add}
      >
        {isAtBottom&&<h3 className={styles.footer__container_title}>Добавить заметку</h3>}

        <AddIcon />
      </Link>
    </footer>
  );
}
