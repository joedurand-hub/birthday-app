import style from "./paginate.module.css";

const Paginate = ({ items, onClick, key }) => {
  return (
    <button className={style.pagination_list} key={key} onClick={onClick}>
      <span className={style.pagination_list_item}>{items}</span>
    </button>
  );
};

export default Paginate;
