import styles from "./loading.module.css";
import Image from "next/image";

// Functionality to be implemented soon
const Loading = () => {
  return (
    <div className={styles.loading}>
      <Image src="/loading.png" width={300} height={300} />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
