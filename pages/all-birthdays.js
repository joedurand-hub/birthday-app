import getBirthdaysInfo from "./api/getBirthdaysInfo";
import React from "react";
import Link from "next/link";
import style from "../styles/container.module.css";
import Card from "../Components/Card/Card";
import { Anchor, AnchorIcons } from "../Components/AnchorsButton/Anchor";

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
        {data.birthdays.length > 0 ? (
          <h1 className={style.container_title}> Birthdays coming soon! </h1>
        ) : (
          <Anchor
            to="/add-birthday"
            name="Set your Birthday reminders"
            variant="secondary"
          />
        )}
        {data.birthdays?.map((objectUser) => (
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
