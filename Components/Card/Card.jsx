import Modal from "../Modal/Modal";
import Image from "next/image";
import Button from "../Button/Button";
import card from "./card.module.css";
import { useModal } from "../../hooks/useModal";
import { AiTwotoneDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import modal from "../Modal/modal.module.css";

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
          router.push("/birthdays");
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
          <i onClick={openModalDelete}> <AiTwotoneDelete className={card.delete}/> </i>
        </div>
      </div>
    </>
  );
}

export default Card;
