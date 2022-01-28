import styles from "./paginate.module.css";
import { useState } from "react";

function Paginate({ users, dataLimit, pageLimit }) {
  const [pages] = useState(Math.round(users.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return users.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  function goToNextPage() {
    setCurrentPage((pages) => pages + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((pages) => pages - 1);
  }

  return (
    <div className="pagination_container">
      <div
        className={`button ${
          users.length === 0 ? styles.paginated_without_data : ""
        }`}
      >
        <Button
          variant="primary"
          className={`${currentPage === 1 ? styles.disabled : ""}`}
          onClick={goToPreviousPage}
          name={"Previous"}
        />
        <Button
          variant="primary"
          className={`${currentPage === 7 ? styles.disabled : ""}`}
          onClick={goToNextPage}
          name={"Next"}
        />
      </div>
      <div className="pagination">
        {getPaginatedData().map((info, id) => (
          <Card key={id} users={info} dataLimit={10} />
        ))}
      </div>
      <div
        className={`${
          users.length === 0
            ? styles.paginated_without_data
            : styles.pages_button
        }`}
      >
        {getPaginationGroup().map((item, index) => (
          <Button
            key={index}
            onClick={changePage}
            className={`${
              styles.pagination_items && currentPage === item ? "active" : null
            }`}
            s
          >
            <span>{item}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Paginate;
