import getBirthdaysInfo from "./api/getBirthdaysInfo";
import React from "react";
import Link from "next/link";
import style from "../styles/container.module.css";
import Card from "../Components/Card/Card";
import { AnchorIcons } from "../Components/AnchorsButton/Anchor";

function allBirthdays({ data }) {
  return (
    <div className={style.container_all_birthdays}>
      <div className={style.container_cards}>
        <Link href="/birthdays" passHref>
          <AnchorIcons
            src={"/back.png"}
            alt={"Icon to back"}
            width={50}
            height={50}
          />
        </Link>
        {data.birthdays.length > 1 ? (
          <h1 className={style.container_title}> Birthdays coming soon! </h1>
        ) : (
          <h1>
            <Link href="/add-birthday" passHref>
              <a>Set your Birthday reminders</a>
            </Link>
          </h1>
        )}
        {data.birthdays?.map((objectUser, index) => (
          <Card
            key={objectUser.id}
            firstName={objectUser.firstName}
            lastName={objectUser.lastName}
            birthday={objectUser.birthday}
            email={objectUser.email}
            id={objectUser.id}
          />
        ))}
      </div>
    </div>
  );
}

export default allBirthdays;

export async function getServerSideProps() {
  const data = await getBirthdaysInfo();

  return {
    props: { data },
  };
}
