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

export const AnchorIcons = React.forwardRef(
  ({ onClick, href, src, alt, width, height }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Image
          src={src}
          width={width}
          height={height}
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
