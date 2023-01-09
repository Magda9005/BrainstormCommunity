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
        <button className={styles.logout} onClick={onClick}>
          <span className={styles.logoutText}>Logout</span>
        </button>
      </Link>
    );
  } else if (!userLoggedIn && userLoggedIn !== null) {
    button = (
      <Link href={"/signin"}>
        <a role="link" className={styles.login}>
          <span className={styles.loginText}>Login</span>
        </a>
      </Link>
    );
  }

  return (
    <div className={styles.navbar}>
            <Link href={'/questions'}>
      <div className={styles.nameAndLogoContainer}>
        <div className={styles.logoWrapper}>
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
          <span className={styles.websiteName}>BrainStorm</span>
          <span className={styles.websiteName}>Community</span>
        </div>
      </div>
      </Link>
      {button}
      {userLoggedIn && (
        <>
          <Link href={"/questions/ask"}>
            <a role="link" className={styles.askQuestion}>
              <div className={styles.askQuestionIconWrapper}>
                <Image
                  src="/ask-question-icon.svg"
                  alt="Cross in the circle"
                  layout="responsive"
                  width="13"
                  height="13"
                />
              </div>
              <span className={styles.askQuestionText}>Ask a question</span>
            </a>
          </Link>
        </>
      )}
    </div>
  );
};
export default Navbar;

