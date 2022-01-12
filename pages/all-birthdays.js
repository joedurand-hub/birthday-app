import getBirthdaysInfo from "./api/getBirthdaysInfo";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import style from "../styles/container.module.css";
import Card from "../Components/Card/card";
import { AnchorToBack } from "../Components/AnchorsButton/anchor";

function allBirthdays({ data }) {
  return (
    <div className={style.container_all_birthdays}>
      <div className={style.container_navigation}>
        <Link href="/birthdays">
          <AnchorToBack />
        </Link>
      </div>
      <div className={style.container_cards}>
        {data.birthdays.length > 1 ? (
          <h1 className={style.container_title}> Birthdays coming soon! </h1>
        ) : (
          <div className={style.container_error}>
            <h1>
              <Link href="/add-birthday">
                <a>Set your Birthday reminders</a>
              </Link>
            </h1>
            <Image
              src="/add-info.png"
              width={300}
              height={300}
              alt="Two people handle information"
            />
          </div>
        )}
        {data.birthdays?.map((objectUser, index) => (
          <Card
            key={index}
            firstName={objectUser.firstName}
            lastName={objectUser.lastName}
            birthday={objectUser.birthday}
            email={objectUser.email}
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
