import styles from "./modules/CommentsListItem.module.scss";
import Header from "./Header";
import Image from "next/image";
import { useState } from "react";

interface CommentListItemProps {
  avatarUrl: string;
  authorName: string;
  date: string;
  commentContent: string;
  thumbsUp: number;
  thumbsDown: number;
  addThumbUp: () => void;
  addThumbDown: () => void;
  commentAlreadyVotedByUser: () => boolean;
  removeThumbUp: () => void;
  removeThumbDown: () => void;
  checkIfAlreadyLiked: () => boolean;
  checkIfAlreadyUnliked: () => boolean;
}

export const CommentListItem: React.FC<CommentListItemProps> = ({
  avatarUrl,
  authorName,
  date,
  commentContent,
  thumbsUp,
  thumbsDown,
  commentAlreadyVotedByUser,
  addThumbUp,
  checkIfAlreadyLiked,
  removeThumbUp,
  checkIfAlreadyUnliked,
  addThumbDown,
  removeThumbDown,
}) => {
  const [likesCount, setLikesCount] = useState(thumbsUp);
  const [unlikesCount, setUnlikesCount] = useState(thumbsDown);
  const [isLiked, setIsLiked] = useState(checkIfAlreadyLiked);
  const [isUnliked, setIsUnliked] = useState(checkIfAlreadyUnliked);

  return (
    <div className={styles.container}>
      <Header avatarUrl={avatarUrl} authorName={authorName} date={date} />
      <p className={styles["comment-content"]}>{commentContent}</p>
      <div className={styles["votes-and-replies-container"]}>
        <div className={styles["votes-container"]}>
          <div
            className={styles["thumbup-icon-wrapper"]}
            onClick={() => {
              if (!commentAlreadyVotedByUser() && !isLiked && isUnliked) {
                setLikesCount((likesCount) => likesCount + 1);
                setIsLiked(true);
                setIsUnliked(false);
                addThumbUp();
                removeThumbDown();
                setUnlikesCount((unlikesCount) => unlikesCount - 1);
              } else if (
                !isLiked &&
                !commentAlreadyVotedByUser() &&
                !isUnliked
              ) {
                setLikesCount((likesCount) => likesCount + 1);
                setIsLiked(true);
                addThumbUp();
              } else if (isLiked) {
                removeThumbUp();
                setLikesCount((likesCount) => likesCount - 1);
                setIsLiked(false);
              }
            }}
          >
            <Image
              src={isLiked ? "/thumbUpOrange.svg" : "/thumbup.svg"}
              alt="Thumb up icon"
              layout="responsive"
              width="14"
              height="14"
            />
          </div>
          <span className={styles.upvotes}>{likesCount}</span>
          <div
            className={styles["thumbdown-icon-wrapper"]}
            onClick={() => {
              if (isLiked && !checkIfAlreadyUnliked() && !isUnliked) {
                setIsLiked(false);
                removeThumbUp();
                setLikesCount((likesCount) => likesCount - 1);
                setIsUnliked(true);
                addThumbDown();
                setUnlikesCount((unlikesCount) => unlikesCount + 1);
              } else if (!isLiked && !checkIfAlreadyUnliked() && !isUnliked) {
                setIsUnliked(true);
                addThumbDown();
                setUnlikesCount((unlikesCount) => unlikesCount + 1);
              } else if (isUnliked) {
                setIsUnliked(false);
                setUnlikesCount((unlikesCount) => unlikesCount - 1);
                removeThumbDown();
              }
            }}
          >
            <Image
              src={isUnliked ? "/thumbDownOrange.svg" : "/thumbdown.svg"}
              alt="Thumb down icon"
              layout="responsive"
              width="14"
              height="14"
            />
          </div>
          <span className={styles.downvotes}> {unlikesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentListItem;
