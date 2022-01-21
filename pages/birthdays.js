import getBirthdaysInfo from "./api/getBirthdaysInfo";
import NavBar from "../Components/NavBar/NavBar";
import Card from "../Components/Card/Card";
import style from "../styles/container.module.css";
import {
  differenceInCalendarDays,
  compareAsc,
  setYear,
  format,
} from "date-fns";

function Birthdays({ data }) {
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
        {dataMatching.length > 0 ? (
          <h1 className={style.container_cards_title}>
            Birthdays coming soon!
          </h1>
        ) : (
          <h1 className={style.container_cards_title}>
            No Birthdays coming soon
          </h1>
        )}
        {dataMatching
          ?.map((objectUser) => (
            <Card
              key={objectUser.dataMatching}
              firstName={objectUser.firstName}
              lastName={objectUser.lastName}
              birthday={format(objectUser.birthday, "yyyy-MM-dd")}
              email={objectUser.email}
              id={objectUser.id}
            />
          ))
          .slice(0, 50)}
        {/*  This is to temporarily limit the number of cards. It will be replaced by pagination functionality */}
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
