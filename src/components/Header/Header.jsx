import React from "react";
import { CloudSun } from "lucide-react";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <CloudSun size={28} className={styles.logoIcon} />
        <span>Atmos</span>
      </h1>
    </header>
  );
}

export default Header;