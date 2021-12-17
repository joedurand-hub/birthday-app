import style  from "../../styles/buttons.module.css";

export const Button = (props) => {
	return (
		<>{props.children}</>
	)
}

export const ButtonPrimary = ({name}, props) => {
	return (
		<button className={style.button_primary}>
			{name}
		</button>
	);
};

export const ButtonSecondary = (props) => {
	return (
		<button className={style.button_secondary}>
			{props.children}
		</button>
	);
};

export const ButtonCancel = (props) => {
	return (
		<button className={style.button_cancel}>
			{props.children}
		</button>
	);
};
