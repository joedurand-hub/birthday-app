import getBirthdaysInfo from "./api/getBirthdaysInfo";
import { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import Card from "../Components/Card/Card";
import Modal from "../Components/Modal/Modal";
import modal from '../styles/modal.module.css';
import card from "../styles/card.module.css";
import style from "../styles/container.module.css";
import Image from "next/image";
import Input from "../Components/Input/Input";
import Link from "next/link";
import { useModal } from "../hooks/useModal";
import { Anchor, AnchorIcons } from "../Components/AnchorsButton/Anchor";
import {
  differenceInCalendarDays,
  compareAsc,
  setYear,
  format,
  isToday,
} from "date-fns";

function Birthdays({ data }) {
  const [dataUser, setDataUser] = useState(null);
  const [mailto, setMailto] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isOpenModalEmail, openModalEmail, closeModalEmail] = useModal(false);
  const newDay = new Date();

  const allBirthdays = data.birthdays?.map((objectUser) => {
    return {
      ...objectUser,
      birthday: setYear(new Date(objectUser.birthday), 2022),
    };
  });

  const dataMatching = allBirthdays
    .filter((objectUser) => {
      const birthdayCalendarDaysDifference = differenceInCalendarDays(
        objectUser.birthday,
        newDay
      );
      return (
        birthdayCalendarDaysDifference <= 6 &&
        birthdayCalendarDaysDifference >= 0
      );
    })
    .sort((a, b) => {
      return compareAsc(a.birthday, b.birthday);
    });

  const dataInModal = dataMatching.find(
    (objectUser) => objectUser.id == dataUser
  );
  const userDataForTheModal = [];
  userDataForTheModal.push(dataInModal);

  const handleMenssage = (e) => {
    const eTargetName = e.target.name;
    const value = e.target.value;
    setMailto({ [eTargetName]: value });
  };

  return (
    <div className={style.container_components}>
      <div className={style.container_cards}>
        <Modal isOpen={isOpenModalEmail} closeModal={closeModalEmail}>
          {userDataForTheModal?.map((objectUser) => (
            objectUser ?
            <form onChange={(e) => handleMenssage(e)} className={modal.modal_form}>
              <h3>
                Wish {objectUser.firstName} {objectUser.lastName} a happy
                birthday
              </h3>

              <h4
                type="email"
                placeholder={"Email"}
                value={objectUser.email}
                name="email"
              >{objectUser.email}</h4>
              <Input
                type="text"
                placeholder={"Subject"}
                value={mailto.subject}
                name="subject"
              />
              <textarea className={modal.modal_textarea}
                type="text"
                placeholder="Message"
                name="message"
                value={mailto.message}
              >
                Message
              </textarea>
              <Anchor className={modal.modal_anchor}
                to={`mailto:${objectUser.email}?subject=${mailto.subject}&body=${mailto.message}`}
                name="Send"
                variant="secondary"
              />
            </form> : ""
          ))}
        </Modal>
        {dataMatching.length > 0 ? (
          <h1 className={style.container_cards_title}>
            Birthdays coming soon!
          </h1>
        ) : (
          <h1 className={style.container_cards_title}>
            No Birthdays coming soon
          </h1>
        )}
        {dataMatching?.map((objectUser) => (
          <Card
            key={objectUser.id}
            firstName={objectUser.firstName}
            lastName={objectUser.lastName}
            birthday={format(objectUser.birthday, "yyyy-MM-dd")}
            email={objectUser.email}
            id={objectUser.id}
            src={"/avatar.png"}
            width={90}
            height={75}
            className={card.image}
          >
            {isToday(objectUser.birthday) ? (
              <>
                <div className={card.email}>
                  <Image
                    src={"/email.png"}
                    width={35}
                    height={35}
                    alt={"Email icon"}
                    onClick={() => {
                      setDataUser(objectUser.id);
                      openModalEmail();
                    }}
                  />
                </div>
                <Link href={`update-birthday/?id=${objectUser.id}`} passHref>
                  <AnchorIcons
                    src={"/edit.png"}
                    alt={"Edit icon"}
                    width={35}
                    height={35}
                    className={card.icons}
                  />
                </Link>
              </>
            ) : (
              <Link href={`update-birthday/?id=${objectUser.id}`} passHref>
                <AnchorIcons
                  src={"/edit.png"}
                  alt={"Edit icon"}
                  width={35}
                  height={35}
                  className={card.icons}
                />
              </Link>
            )}
          </Card>
        ))}
      </div>
      <NavBar />
    </div>
  );
}

export default Birthdays;

export async function getServerSideProps() {
  const data = await getBirthdaysInfo();

  return {
    props: { data },
  };
}
