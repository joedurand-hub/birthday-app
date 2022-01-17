import { AnchorIcons } from "../AnchorsButton/Anchor";
import button from "../../styles/Buttons.module.css";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import Link from "next/link";
import card from "../../styles/card.module.css";
import Image from "next/image";

function Card({ firstName, lastName, birthday, email, id }) {
  const [isOpenModal, openModal, closeModal] = useModal(false);

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
        <div>
          <AnchorIcons
            src={"/delete-icon.png"}
            alt={"Edit icon"}
            width={35}
            height={35}
            className={card.icons}
            onClick={openModal}
          />
          <Modal isOpen={isOpenModal} closeModal={closeModal}>
            <h1>User</h1>
            <p>Are you sure you want to delete this card?</p>
            <Image
              src="/delete.png"
              width={350}
              height={150}
              alt="Delete Card"
            />
            <button className={button.button_cancel}>Delete</button>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Card;
