import React from "react";
import styles from "../../styles/Buttons.module.css";
import Image from "next/image";
import { cc } from "../../helpers/variant.js";
import Link from "next/link";

export const Anchor = React.forwardRef(
  ({ onClick, to, name, variant = "primary", disabled }, ref) => {
    return (
      <Link href={to} passHref>
        <a
          rel="noreferrer noopener"
          onClick={onClick}
          ref={ref}
          className={cc(
            styles.button,
            styles[variant],
            disabled && styles.disabled
          )}
        >
          {name}
        </a>
      </Link>
    );
  }
);
