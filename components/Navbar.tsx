import Image from "next/image";
import styles from "./modules/Navbar.module.scss";
import Link from "next/link";

interface NavbarProps {
  onClick: () => void;
  userLoggedIn: boolean | null;
}

const Navbar: React.FC<NavbarProps> = ({ onClick, userLoggedIn }) => {
  let button;

  if (userLoggedIn && userLoggedIn !== null) {
    button = (
      <Link href={"/"}>
        <button className={styles["logout"]} onClick={onClick}>
          <span className={styles["logout-text"]}>Logout</span>
        </button>
      </Link>
    );
  } else if (!userLoggedIn && userLoggedIn !== null) {
    button = (
      <Link href={"/signin"}>
        <a role="link" className={styles["login"]}>
          <span className={styles["login-text"]}>Login</span>
        </a>
      </Link>
    );
  }

  return (
    <div className={styles["navbar"]}>
      <div className={styles["name-and-logo-container"]}>
        <div className={styles["logo-wrapper"]}>
          <Image
            src="/logo.svg"
            alt="BrainstormCommunity-logo"
            priority={true}
            layout="responsive"
            width="25"
            height="30"
          />
        </div>
        <div>
          <span className={styles["website-name"]}>BrainStorm</span>
          <span className={styles["website-name"]}>Community</span>
        </div>
      </div>
      {button}
      {userLoggedIn && (
        <>
          <Link href={"/questions/ask"}>
            <a role="link" className={styles["ask-question"]}>
              <div className={styles["ask-question-icon-wrapper"]}>
                <Image
                  src="/ask-question-icon.svg"
                  alt="Cross in the circle"
                  layout="responsive"
                  width="13"
                  height="13"
                />
              </div>
              <span className={styles["ask-question-text"]}>
                Ask a question
              </span>
            </a>
          </Link>
        </>
      )}
    </div>
  );
};
export default Navbar;
