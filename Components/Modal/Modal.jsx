import styles from "../../styles/modal.module.css";

function Modal({ children, isOpen, closeModal }) {
  const modalHandleClick = (e) => e.stopPropagation();

  return (
    <div
      className={`${isOpen ? styles.is_open : styles.modal_container}`}
      onClick={closeModal}
    >
      <div className={styles.modal} onClick={modalHandleClick}>
        <button className={styles.modal_close} onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
