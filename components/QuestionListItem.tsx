import styles from "./modules/QuestionListItem.module.scss";
import Image from "next/image";
import TagLabel from "./TagLabel";
import Link from "next/link";

interface QuestionListItemProps {
  nickname: string;
  date: string;
  title: string;
  text: string;
  imageUrl: string;
  tags: string[];
  viewsAmount: number;
  commentsAmount: number;
  upvotesAmount: number;
  postId: number;
  handleIncreaseViews: () => void;
  userLoggedIn: boolean;
}

const QuestionListItem: React.FC<QuestionListItemProps> = ({
  nickname,
  date,
  title,
  text,
  imageUrl,
  tags,
  viewsAmount,
  commentsAmount,
  upvotesAmount,
  postId,
  handleIncreaseViews,
  userLoggedIn,
}) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.avatarWrapper}>
        <Image
          src={imageUrl}
          alt="Author's photo/avatar"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.nicknameAndTimeContainer}>
        <span className={styles.nickname}>@{nickname}</span>
        <span className={styles.date}>{date}</span>
      </div>
      {userLoggedIn && (
        <>
          <Link href={`/questions/${postId}`}>
            <div
              className={styles.dotsVerticalWrapper}
              onClick={handleIncreaseViews}
            >
              <Image
                src="/dots-vertical.svg"
                alt="3 vertical dots"
                layout="responsive"
                width="27"
                height="27"
              />
            </div>
          </Link>
        </>
      )}
    </div>
    <div className={styles.titleAndTextContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.textTeaser}>{text}</p>
    </div>
    <div className={styles.submenu}>
      <div className={styles.tagsContainer}>
        {tags.map((tag) => (
          <TagLabel tagName={tag} />
        ))}
      </div>
      <div className={styles.activitiesContainer}>
        <div className={styles.viewsContainer}>
          <div className={styles.viewsIconWrapper}>
            <Image
              src="/eye.svg"
              alt="Eye icon"
              layout="responsive"
              width="15"
              height="15"
            />
          </div>
          <span className={styles.viewsNumber}> {viewsAmount}</span>
        </div>
        <div className={styles.commentsContainer}>
          <div className={styles.commentIconWrapper}>
            <Image
              src="/comment-icon.svg"
              alt="Comment icon"
              layout="responsive"
              width="15"
              height="15"
            />
          </div>
          <span className={styles.commentsNumber}> {commentsAmount}</span>
        </div>
        <div className={styles.upvotesContainer}>
          <div className={styles.upvotesIconWrapper}>
            <Image
              src="/upvotes-icon.svg"
              alt="Upvotes icon"
              layout="responsive"
              width="15"
              height="15"
            />
          </div>
          <span className={styles.upvotesNumber}>{upvotesAmount}</span>
        </div>
      </div>
    </div>
  </div>
);

export default QuestionListItem;
