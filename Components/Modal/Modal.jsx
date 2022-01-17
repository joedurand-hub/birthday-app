import styles from "../../styles/modal.module.css";

function Modal({ children, isOpen, closeModal }) {
  return (
    <article
      className={`${isOpen ? styles.is_open : styles.modal_container}`}
      onClick={closeModal}
    >
      <div className={styles.modal}>
        <button className={styles.modal_close} onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </article>
  );
}

export default Modal;
