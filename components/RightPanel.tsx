import styles from "../components/modules/RightPanel.module.scss";
import Image from "next/image";
import Avatar from "./Avatar";
import Link from "next/link";

interface RightPanelProps {
  questionsList: boolean;
  openQuestion: boolean;
  avatarUrl: string;
  author: string;
  posts: number;
}

const RightPanel: React.FC<RightPanelProps> = ({
  questionsList,
  openQuestion,
  avatarUrl,
  author,
  posts,
}) => (
  <div className={styles["right-panel-container"]}>
    {questionsList && (
      <>
        <div className={styles["must-read-container"]}>
          <div className={styles["title-wrapper"]}>
            <div className={styles["icon-wrapper"]}>
              <Image
                src="/star.svg"
                alt="Star icon"
                layout="responsive"
                width="18"
                height="18"
              />
            </div>
            <span className={styles["must-read-title"]}>Must-read posts </span>
          </div>
          <div className={styles["links-container"]}>
            <Link href={"/rules"}>
              <div className={styles["link-wrapper"]}>
                <div className={styles.hash}>•</div>{" "}
                <a className={styles["link"]}>
                  {" "}
                  Please read rules before you start working on a platform
                </a>
              </div>
            </Link>
            <Link href={"/vision"}>
              <a role="link">
                <div className={styles["link-wrapper"]}>
                  <div className={styles.hash}> •</div>
                  <a className={styles["link"]}>
                    {" "}
                    Vision & strategy of BrainstormCommunity
                  </a>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles["featured-links-container"]}>
          <div className={styles["title-wrapper"]}>
            <div className={styles["icon-wrapper"]}>
              <Image
                src="/featured-links-icon.svg"
                alt="Icon"
                layout="responsive"
                width="18"
                height="18"
              />
            </div>
            <span className={styles["featured-links-title"]}>
              Featured Links{" "}
            </span>
          </div>
          <div className={styles["links-container"]}>
            <div className={styles["link-wrapper"]}>
              <div className={styles.hash}>•</div>{" "}
              <a className={styles["link"]}>
                {" "}
                BrainstormCommunity source-code on GitHub
              </a>
            </div>
          </div>
        </div>
      </>
    )}

    {openQuestion && (
      <>
        <Avatar openQuestion={true} avatarUrl={avatarUrl} />
        <div className={styles["author"]}>@{author}</div>
        <div className={styles["posts-quantity-container"]}>
          <div className={styles["sparkles-icon-wrapper"]}>
            <Image
              src="/sparkles.svg"
              alt="Sparkles"
              layout="responsive"
              width="24"
              height="24"
            />
          </div>
          <span className={styles["posts-amount"]}>{posts}</span>
        </div>
        <Link href={`https://github.com/${author}`}>
          <div className={styles["github-icon-wrapper"]}>
            <Image
              src="/github-icon.svg"
              alt="Github icon"
              layout="responsive"
              width="18"
              height="18"
            />
          </div>
        </Link>
      </>
    )}
  </div>
);

export default RightPanel;
