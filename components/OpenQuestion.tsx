import styles from "./modules/OpenQuestion.module.scss";
import TagLabel from "./TagLabel";
import Image from "next/image";
import Header from "./Header";

interface OpenQuestionProps {
  avatar: string;
  authorName: string;
  date: string;
  title: string;
  text: string;
  tags: string[];
  onClick: () => void;
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({
  avatar,
  authorName,
  date,
  title,
  text,
  tags,
  onClick,
  voted
}) => (
  <div className={styles.questionContainer}>
    <Header avatarUrl={avatar} authorName={authorName} date={date} />
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.text}>{text}</p>
    <div className={styles.submenu}>
      <div className={styles.tagsContainer}>
        {tags.map((tag) => (
          <TagLabel tagName={tag} />
        ))}
      </div>
      {voted?<button className={styles.votedButton} onClick={onClick}><span className={styles.voted}>Voted</span>
</button> : <button className={styles.voteButton} onClick={onClick}>
        <div className={styles.arrowIconWrapper}>
          <Image
            src={"/arrow-up.svg"}
            alt="Arrow-up-icon"
            layout="responsive"
            width="13"
            height="13"
          />
        </div>{" "}
        <span className={styles.vote}>Vote</span>
      </button>}
    </div>
  </div>
);

export default OpenQuestion;
