import style from "./paginate.module.css";

const Paginate = ({ items, onClick }) => {
  return (
    <button className={style.pagination_list} onClick={onClick}>
      <span className={style.pagination_list_item}>{items}</span>
    </button>
  );
};

export default Paginate;
