import getBirthdaysInfo from "./api/getBirthdaysInfo";
import NavBar from "../Components/NavBar/NavBar";
import Card from "../Components/Card/Card";
import style from "../styles/container.module.css";
import Image from "next/image";
import {
  differenceInCalendarDays,
  compareAsc,
  setYear,
  format,
  isToday,
  addDays,
  isTomorrow,
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
        birthdayCalendarDaysDifference >= -1
      );
    })
    .sort((a, b) => {
      return compareAsc(a.birthday, b.birthday);
    });

  dataMatching.filter((objectUser) => {
    console.log(addDays(objectUser.birthday, 1));
    console.log("es hoy", isToday(objectUser.birthday));
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
        {dataMatching?.map(
          (objectUser) =>
            isTomorrow(objectUser.birthday) && (
              <Card
                key={objectUser.id}
                firstName={objectUser.firstName}
                lastName={objectUser.lastName}
                birthday={format(objectUser.birthday, "yyyy-MM-dd")}
                email={objectUser.email}
                id={objectUser.id}
              >
                <Image
                  src="/email.png"
                  width={35}
                  height={35}
                  alt="email icon"
                />
              </Card>
            )
        )}
        {/* {dataMatching?.map((objectUser) => (
          <Card
            key={objectUser.dataMatching}
            firstName={objectUser.firstName}
            lastName={objectUser.lastName}
            birthday={format(objectUser.birthday, "yyyy-MM-dd")}
            email={objectUser.email}
            id={objectUser.id}
          />
        ))} */}
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
