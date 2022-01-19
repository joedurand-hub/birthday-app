import { AnchorIcons } from "../AnchorsButton/Anchor";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import card from "../../styles/card.module.css";
import button from "../../styles/Buttons.module.css";
import modal from "../../styles/modal.module.css";

function Card({ firstName, lastName, birthday, email, id }) {
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const handleSubmit = () => {
    fetch(`https://birthday-app-api.vercel.app/api/v1/john/birthdays/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("method DELETE:", response);
          return response.json();
        }
      })
      .then((response) => console.log("Success:", response))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={card.card}>
      <Image
        src="/avatar.png"
        width={90}
        height={75}
        className={card.image}
        alt="Avatar"
      />
      <div className={card.texts}>
        <h4 className={card.card_text}>
          {firstName} {lastName}
        </h4>
        <p className={card.card_text_seconday}>{email}</p>
        <p className={card.card_text_seconday}>{birthday}</p>
      </div>
      <div className={card.container_icons}>
        <Link href={`update-birthday/?id=${id}`} passHref>
          <AnchorIcons
            src={"/edit.png"}
            alt={"Edit icon"}
            width={35}
            height={35}
            className={card.icons}
          />
        </Link>
        <Image
          src={"/delete-icon.png"}
          alt={"Delete icon"}
          width={35}
          height={35}
          className={card.icons}
          onClick={openModal}
        />
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <h2 key={id}>User</h2>
            <p>
              Do you want to delete <strong>{firstName}</strong>’s birthday?
            </p>
            <Image
              src="/delete.png"
              width={350}
              height={150}
              alt="Delete Card"
            />
            <Button
              type="submit"
              className={button.button_cancel}
              onClick={closeModal}
              name={"Delete"}
            />
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Card;
