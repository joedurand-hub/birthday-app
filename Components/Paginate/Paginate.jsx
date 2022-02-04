import style from "./paginate.module.css";

const Paginate = ({ items, onClick, key }) => {
  return (
    <div className={style.pagination}>
      <button className={style.pagination_list} key={key} onClick={onClick}>
        <span className={style.pagination_list_item}>{items}</span>
      </button>
    </div>
  );
};

export default Paginate;
