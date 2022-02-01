import getBirthdaysInfo from "./api/getBirthdaysInfo";
import { useState, useMemo } from "react";
import NavBar from "../Components/NavBar/NavBar";
import Card from "../Components/Card/Card";
import Modal from "../Components/Modal/Modal";
import Paginate from "../Components/Paginate/Paginate";
import modal from "../styles/modal.module.css";
import card from "../styles/card.module.css";
import style from "../styles/container.module.css";
import Image from "next/image";
import Input from "../Components/Input/Input";
import Button from "../Components/Button/Button";
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
  const newDay = new Date();

  // pensar como agrupar la data
  //
  
  const allBirthdays = useMemo(() => {
   return data.birthdays?.map((objectUser) => {
      return {
        ...objectUser,
        birthday: setYear(new Date(objectUser.birthday), 2022),
      };
    });
  }, [data]);

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
    (objectUser) => objectUser.id === dataUser
  );
  const userDataForTheModal = [];
  userDataForTheModal.push(dataInModal);

  const handleMessage = (e) => {
    const eTargetName = e.target.name;
    const value = e.target.value;
    setMailto({ ...mailto, [eTargetName]: value });
  };

  const handleCancel = () => {
    setMailto({
      message: "",
      subject: "",
    });
  };

  console.log("subject", mailto.subject);

  return (
    <main className={style.container_components}>
      <div className={style.container_cards}>
        <Modal isOpen={isOpenModalEmail} closeModal={closeModalEmail}>
          {dataInModal && (
            <form
              className={modal.modal_form}
            >
              <h3>
                Wish {dataInModal.firstName} {dataInModal.lastName} a happy
                birthday
              </h3>

              <h4
                type="email"
                placeholder={"Email"}
                value={dataInModal.email}
                name="email"
              >
                {dataInModal.email}
              </h4>
              <Input
              onChange={(e) => cancelMessage(e)}
                type="text"
                placeholder={"Subject"}
                value={mailto.subject}
                name="subject"
              />
              <textarea
              onChange={(e) => handleMessage(e)}
                className={modal.modal_textarea}
                type="text"
                placeholder="Message"
                name="message"
                value={mailto.message}
              >
                Message
              </textarea>
              <div className={modal.modal_container_buttons}>
                <Button
                  onClick={(e) => {
                    handleCancel(e);
                    closeModalEmail(e);
                  }}
                  name="Cancel"
                  variant="cancel"
                  type="button"
                />
                <Anchor
                  className={modal.modal_anchor}
                  to={`mailto:${dataInModal.email}?subject=${mailto.subject}&body=${mailto.message}`}
                  name="Send"
                  variant="primary"
                />
              </div>
            </form>
          )}
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
            <Link href={`update-birthday/?id=${objectUser.id}`} passHref>
              <AnchorIcons
                src={"/edit.png"}
                alt={"Edit icon"}
                width={35}
                height={35}
                className={card.icons}
              />
            </Link>
          </Card>
        ))}
      </div>
      <NavBar />
    </main>
  );
}

export default Birthdays;

export async function getServerSideProps() {
  const data = await getBirthdaysInfo();

  return {
    props: { data },
  };
}
