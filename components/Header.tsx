import styles from "./modules/Header.module.scss";
import Avatar from "./Avatar";

interface HeaderProps {
  avatarUrl: string;
  authorName: string;
  date: string;
  openQuestion: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  avatarUrl,
  authorName,
  date,
  openQuestion,
}) => (
  <div className={styles["header"]}>
    <Avatar avatarUrl={avatarUrl} openQuestion={openQuestion} />
    <div className={styles["nickname-and-time-container"]}>
      <span className={styles["nickname"]}>@{authorName}</span>
      <span className={styles["date"]}>{date}</span>
    </div>
  </div>
);

export default Header;
