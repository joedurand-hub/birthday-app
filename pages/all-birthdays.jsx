import getBirthdaysInfo from "./api/getBirthdaysInfo";
import { useState } from "react";
import { usePagination } from "../hooks/usePagination";
import Link from "next/link";
import Head from "next/head";
import style from "../styles/container.module.css";
import card from "../Components/Card/card.module.css";
import button from "../Components/Button/button.module.css";
import Search from "../Components/Search/Search";
import NavBar from "../Components/NavBar/NavBar";
import Paginate from "../Components/Paginate/Paginate";
import Button from "../Components/Button/Button";
import Card from "../Components/Card/Card";
import Footer from "../Components/Footer/Footer";
import { BiEdit } from "react-icons/bi";
import { Anchor } from "../Components/AnchorsButton/Anchor";

function AllBirthdays({ data }) {
  const {
    nextPage,
    previousPage,
    changePage,
    filteredBirthdays,
    currentData,
    itemsToPaginate,
    currentPage,
  } = usePagination(data.birthdays);

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setSearch(search);
  };

  return (
    <>
      <main className={style.container_all_birthdays}>
        <Head>
          <title>Birthday App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/cake.ico" />
        </Head>
        <NavBar name="Birthdays" href="/birthdays" />
        <div className={style.container_cards}>
          {data.birthdays.length > 0 ? (
            <h1 className={style.container_title}> Birthdays coming soon! </h1>
          ) : (
            <Anchor
              to="/add-birthday"
              name="Set your Birthday reminders"
              variant="secondary"
            />
          )}
          <Search onSubmit={handleSubmit} />

          {filteredBirthdays(search).map((objectUser) => (
            <Card
              key={objectUser.id}
              firstName={objectUser.firstName}
              lastName={objectUser.lastName}
              birthday={objectUser.birthday}
              email={objectUser.email}
              id={objectUser.id}
              src="/avatar.png"
              width={90}
              height={75}
            >
              <Link href={`update-birthday/?id=${objectUser.id}`} passHref>
                <a>
                  <i>
                    <BiEdit className={card.edit} />
                  </i>
                </a>
              </Link>
            </Card>
          ))}
          <div className={style.container_paginated}>
            {search !== undefined &&
            search.length >= 4 ? null : itemsToPaginate.length <= 1 ? null : (
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

                <div className={style.container_paginated_items}>
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
                    currentData.length === 5 ? "primary" : button.disabled
                  }`}
                  type="button"
                />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const data = await getBirthdaysInfo();

  return {
    props: { data },
  };
}

export default AllBirthdays;
