import getBirthdaysInfo from "./api/getBirthdaysInfo";
import { useState, useMemo } from "react";
import NavBar from "../Components/NavBar/NavBar";
import Card from "../Components/Card/Card";
import Modal from "../Components/Modal/Modal";
import modal from "../styles/modal.module.css";
import button from "../styles/Buttons.module.css";
import card from "../Components/Card/card.module.css";
import style from "../styles/container.module.css";
import Image from "next/image";
import Paginate from "../Components/Paginate/Paginate";
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
import { usePagination } from "../hooks/usePagination";

function Birthdays({ data }) {
  const [dataUser, setDataUser] = useState(null);
  const [mailto, setMailto] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isOpenModalEmail, openModalEmail, closeModalEmail] = useModal(false);
  const newDay = new Date();

  const allBirthdays = useMemo(() => {
    return data.birthdays.map((objectUser) => {
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

  const {
    nextPage,
    previousPage,
    changePage,
    currentData,
    currentPage,
    itemsToPaginate,
  } = usePagination(dataMatching);

  return (
    <main className={style.container_components}>
      <div className={style.container_cards}>
        <Modal isOpen={isOpenModalEmail} closeModal={closeModalEmail}>
          {dataInModal && (
            <form className={modal.modal_form}>
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
                onChange={(e) => handleMessage(e)}
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
        {currentData.map((objectUser) => (
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
        <div className={style.container_paginated}>
          {itemsToPaginate <= 1 ? (
            ""
          ) : (
            <>
              <Button
                onClick={() => {
                  previousPage();
                }}
                variant={`${
                  currentPage - 1 <= 0 ? button.disabled : "primary"
                }`}
                name="Previous"
                type="button"
              />
              <div>
                {itemsToPaginate.map((item, index) => (
                  <Paginate key={index} onClick={changePage} items={item} />
                ))}
              </div>

              <Button
                onClick={() => {
                  nextPage();
                }}
                name="Next"
                variant={`${
                  currentPage === itemsToPaginate.length
                    ? button.disabled
                    : "primary"
                }`}
                type="button"
              />
            </>
          )}
        </div>
      </div>
      <NavBar name="All Birthdays" href="/all-birthdays" />

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
