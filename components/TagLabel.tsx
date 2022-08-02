import styles from './modules/TagLabel.module.scss';

interface TagLabelProps{
tagName:string;
}

const TagLabel: React.FC <TagLabelProps>=({tagName})=>(
<div className={styles["tag-wrapper"]}>
            <span className={styles["tag-name"]}>{tagName}</span>
        </div>
    )

        
    
export default TagLabel;