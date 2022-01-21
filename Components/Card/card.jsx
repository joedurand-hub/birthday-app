import { AnchorIcons } from "../AnchorsButton/Anchor";
import { useModal } from "../../hooks/useModal";
import { useFetch } from "../../hooks/useFetch";

import Modal from "../Modal/Modal";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import card from "../../styles/card.module.css";

function Card({ firstName, lastName, birthday, email, id }) {
  const [isOpenModal, openModal, closeModal] = useModal(false);
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
          console.log("method DELETE, success:", response);
          alert("Birthday deleted!");
          router.push("/birthdays");
          return response.json();
        }
      })
      .catch((error) => {
        alert("An error has occurred, please try again later");
        console.error("Error:", error);
      });
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
        <Modal key={id} isOpen={isOpenModal} closeModal={closeModal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Birthday deleted!");
              router.push("/birthdays");
              handleSubmit(e);
            }}
          >
            <h2>User</h2>
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
              variant="cancel"
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
