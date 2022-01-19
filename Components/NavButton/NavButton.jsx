import Link from "next/link";
import { AnchorPrimary, AnchorSecondary } from "../AnchorsButton/Anchor";

import Button from "../../styles/Buttons.module.css";

const NavButton = (path, name) => (
  <Link href={path} passHref>
    <AnchorPrimary name={name} />
  </Link>
);

export default NavButton;
