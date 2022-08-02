import styles from "../components/modules/Search.module.scss";

interface SearchProps {
  value: string;
  onChange: () => void;
  onClick: () => void;
  onSubmit: () => void;
  action: string;
}

const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  onSubmit,
  action,
}) => (
  <form role="form" action={action} method="GET" onSubmit={onSubmit}>
    <input
      className={styles["search-input"]}
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
    />
  </form>
);

export default Search;
