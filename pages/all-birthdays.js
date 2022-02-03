import getBirthdaysInfo from "./api/getBirthdaysInfo";
import { usePagination } from "../hooks/usePagination";
import Link from "next/link";
import style from "../styles/container.module.css";
import card from "../styles/card.module.css";
import button from "../styles/Buttons.module.css";
import Button from "../Components/Button/Button"
import Loading from "../Components/Loading/Loading";
import Card from "../Components/Card/Card";
import { Anchor, AnchorIcons } from "../Components/AnchorsButton/Anchor";

function AllBirthdays({ data }) {
  const [filterData, nextPage, previousPage, currentPage] = usePagination(data.birthdays)

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

        {data.birthdays.length > 0 ? (
          filterData().map((objectUser) => (
            <Card
              key={objectUser.id}
              firstName={objectUser.firstName}
              lastName={objectUser.lastName}
              birthday={objectUser.birthday}
              email={objectUser.email}
              id={objectUser.id}
              src={"/avatar.png"}
              width={90}
              height={75}
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
          ))
        ) : (
          <Loading />
        )}
        <div className={style.container_divs_button}>
          <Button
            onClick={() => {
              console.log("previousPage", previousPage())
              previousPage()
            }}
            variant={`${currentPage -1 < 0 ? button.disabled : "primary" }`}
            name="Previous"
            type="button"
          />
          <Button
            onClick={nextPage}
            name="Next"
            variant={`${
              currentPage + 5 > data.birthdays.length
                ? button.disabled
                : "primary"
            }`}
            type="button"
          />
        </div>
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
