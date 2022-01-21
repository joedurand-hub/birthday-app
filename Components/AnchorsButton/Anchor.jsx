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

export const AnchorIcons = React.forwardRef(
  ({ onClick, href, src, alt, width, height }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Image src={src} width={width} height={height} alt={alt} />
      </a>
    );
  }
);
