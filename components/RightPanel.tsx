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
  <div className={styles.rightPanelContainer}>
    {questionsList && (
      <>
        <div className={styles.mustReadContainer}>
          <div className={styles.titleWrapper}>
            <div className={styles.iconWrapper}>
              <Image
                src="/star.svg"
                alt="Star icon"
                layout="responsive"
                width="18"
                height="18"
              />
            </div>
            <span className={styles.mustReadTitle}>Must-read posts </span>
          </div>
          <div className={styles.linksContainer}>
            <Link href={"/rules"}>
              <div className={styles.linkWrapper}>
                <div className={styles.hash}>•</div>{" "}
                <a className={styles.link}>
                  {" "}
                  Please read rules before you start working on a platform
                </a>
              </div>
            </Link>
            <Link href={"/vision"}>
              <a role="link">
                <div className={styles.linkWrapper}>
                  <div className={styles.hash}> •</div>
                  <a className={styles.link}>
                    {" "}
                    Vision & strategy of BrainstormCommunity
                  </a>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.featuredLinksContainer}>
          <div className={styles.titleWrapper}>
            <div className={styles.iconWrapper}>
              <Image
                src="/featured-links-icon.svg"
                alt="Icon"
                layout="responsive"
                width="18"
                height="18"
              />
            </div>
            <span className={styles.featuredLinksTitle}>Featured Links</span>
          </div>
          <div className={styles.linksContainer}>
            <div className={styles.linkWrapper}>
              <div className={styles.hash}>•</div>
              <a className={styles.link}>
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
        <div className={styles.author}>@{author}</div>
        <div className={styles.postsQuantityContainer}>
          <div className={styles.sparklesIconWrapper}>
            <Image
              src="/sparkles.svg"
              alt="Sparkles"
              layout="responsive"
              width="24"
              height="24"
            />
          </div>
          <span className={styles.postsAmount}>{posts}</span>
        </div>
        <Link href={`https://github.com/${author}`}>
          <div className={styles.githubIconWrapper}>
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
