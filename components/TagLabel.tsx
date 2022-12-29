import styles from "./modules/TagLabel.module.scss";

interface TagLabelProps {
  tagName: string;
}

const TagLabel: React.FC<TagLabelProps> = ({ tagName }) => (
  <div className={styles.tagWrapper}>
    <span className={styles.tagName}>{tagName}</span>
  </div>
);

export default TagLabel;
