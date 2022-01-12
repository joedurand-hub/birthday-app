import React from "react";
import style from "../../styles/Buttons.module.css";
import Image from "next/image";

export const AnchorPrimary = React.forwardRef(
  ({ onClick, href, name }, ref) => {
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className={style.button_primary}
      >
        {name}
      </a>
    );
  }
);

export const AnchorCancel = React.forwardRef(({ onClick, href, name }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={style.button_cancel}>
      {name}
    </a>
  );
});

export const AnchorToBack = React.forwardRef(
  ({ onClick, href, src, alt }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Image
          src={src}
          width={50}
          height={50}
          className={style.back}
          alt={alt}
        />
      </a>
    );
  }
);

export const AnchorSecondary = React.forwardRef(
  ({ onClick, href, name }, ref) => {
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className={style.button_secondary}
      >
        {name}
      </a>
    );
  }
);
