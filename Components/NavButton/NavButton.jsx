import Link from "next/link";
import { Anchor } from "../AnchorsButton/Anchor";

// in process to refactor NavBar
const NavButton = (path, name) => <Anchor name={name} to={path} />;

export default NavButton;
