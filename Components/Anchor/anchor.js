import React from "react";
import style  from "../../styles/buttons.module.css";

export const AnchorToNext = React.forwardRef(({ onClick, href, name, disabled }, ref) => {
	return (
		<a href={href} onClick={onClick} ref={ref} disabled={disabled} className={style.button_primary}>
			{name}
		</a>
	);
});

export const AnchorCancel = React.forwardRef(({ onClick, href, name }, ref) => {
	return (
		<a href={href} onClick={onClick} ref={ref} className={style.button_cancel}>
			{name}
		</a>
	);
});

export const AnchorToBack = React.forwardRef(({ onClick, href, name }, ref) => {
	return (
		<a href={href} onClick={onClick} ref={ref} className={style.button_secondary}>
			{name}
		</a>
	);
});
