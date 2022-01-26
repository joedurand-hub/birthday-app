import getBirthdaysInfo from "./api/getBirthdaysInfo";
import NavBar from "../Components/NavBar/NavBar";
import Card from "../Components/Card/Card";
import Modal from "../Components/Modal/Modal";
import Button from "../Components/Button/Button";
import card from "../styles/card.module.css";
import style from "../styles/container.module.css";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "../hooks/useModal";
import { AnchorIcons } from "../Components/AnchorsButton/Anchor";
import {
  differenceInCalendarDays,
  compareAsc,
  setYear,
  format,
  isToday,
} from "date-fns";

function Birthdays({ data }) {
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

  return (
    <div className={style.container_components}>
      <div className={style.container_cards}>
        <Modal isOpen={isOpenModalEmail} closeModal={closeModalEmail}>
          <h4>Nuevo título</h4>
          <Button
            type="submit"
            variant="secondary"
            onClick={closeModalEmail}
            name={"Send"}
          />
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
        {dataMatching?.map((objectUser) =>
          isToday(objectUser.birthday) ? (
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
              <div className={card.email}>
                <Image
                  src={"/email.png"}
                  width={35}
                  height={35}
                  alt={"Email icon"}
                  onClick={openModalEmail}
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
            </Card>
          ) : (
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
              alt={"Avatar"}
            >
              <div className={card.container_icons}>
                <Link href={`update-birthday/?id=${objectUser.id}`} passHref>
                  <AnchorIcons
                    src={"/edit.png"}
                    alt={"Edit icon"}
                    width={35}
                    height={35}
                    className={card.icons}
                  />
                </Link>
              </div>
            </Card>
          )
        )}
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
