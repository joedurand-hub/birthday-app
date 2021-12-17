import React from "react";
import styles from "../../styles/footer.module.css";
import style from "../../styles/buttons.module.css";
import Link from "next/link";

function Footer() {

	return (
		<nav className={styles.footer}>
            <ul>
                <li>
                    <Link>
                <a>Cancel</a>
                    </Link>
                </li>
                <li>
                    <Link>
                <a>Accept</a>
                    </Link>
                </li>
            </ul>
		</nav>
	);
}

export default Footer;
