import { Fragment } from "react";
import style from "../../styles/container.module.css";

const Container = (props) => {
	return (
		<div className={style.container}>

			<main className={style.container_content}>
                {props.children}
            </main>

		</div>
	);
};

export default Container;
