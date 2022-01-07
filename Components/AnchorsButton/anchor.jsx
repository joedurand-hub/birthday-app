import React from "react";
import style from "../../styles/Buttons.module.css";
import Image from "next/image";

export const AnchorPrimary = React.forwardRef(
	({ onClick, href, name, disabled }, ref) => {
		return (
			<a
				href={href}
				onClick={onClick}
				ref={ref}
				disabled={disabled}
				className={style.button_primary}
			>
				{name}
			</a>
		);
	},
);

export const AnchorCancel = React.forwardRef(({ onClick, href, name }, ref) => {
	return (
		<a href={href} onClick={onClick} ref={ref} className={style.button_cancel}>
			{name}
		</a>
	);
});

export const AnchorToBack = React.forwardRef(({ onClick, href }, ref) => {
	return (
		<a href={href} onClick={onClick} ref={ref}>
			<Image src="/back.png" width={50} height={50} className={style.back} alt="Image not found" />
		</a>
	);
});

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
	},
);
