import { AnchorIcons } from "../AnchorsButton/Anchor";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import card from "../../styles/card.module.css";
import modal from "../../styles/modal.module.css";

function Card({
  firstName,
  lastName,
  birthday,
  email,
  id,
  src,
  alt,
  width,
  height,
  children,
}) {
  const [isOpenModalDelete, openModalDelete, closeModalDelete] =
    useModal(false);
  const router = useRouter();

  const handleSubmit = () => {
    fetch(`https://birthday-app-api.vercel.app/api/v1/john/birthdays/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Birthday deleted!");
          response.json();
          return router.push("/birthdays");
        }
      })
      .catch((error) => {
        alert("An error has occurred, please try again later");
      });
  };

  return (
    <>
      <Modal isOpen={isOpenModalDelete} closeModal={closeModalDelete}>
        <form
          className={modal.modal_form}
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/birthdays");
            handleSubmit(e);
          }}
        >
          <h2>User</h2>
          <p>
            Do you want to delete <strong>{firstName}</strong>’s birthday?
          </p>
          <Image src="/delete.png" width={350} height={150} alt="Delete Card" />
          <div className={modal.modal_container_buttons}>
            <Button
              type="button"
              variant="cancel"
              onClick={closeModalDelete}
              name="Cancel"
            />
            <Button
              type="submit"
              variant="secondary"
              onClick={closeModalDelete}
              name={"Delete"}
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/birthdays");
                handleSubmit(e);
              }}
            />
          </div>
        </form>
      </Modal>
      <div className={card.card}>
        <Image
          src={src}
          width={width}
          height={height}
          className={card.image}
          alt={alt}
        />
        <div className={card.texts}>
          <h4 className={card.card_text}>
            {firstName} {lastName}
          </h4>
          <p className={card.card_text_seconday}>{email}</p>
          <p className={card.card_text_seconday}>{birthday}</p>
        </div>
        <div className={card.container_icons}>
          {children}
          <Image
            src={"/delete-icon.png"}
            alt={"Delete icon"}
            width={35}
            height={35}
            className={card.icons}
            onClick={openModalDelete}
          />
        </div>
      </div>
    </>
  );
}

export default Card;
