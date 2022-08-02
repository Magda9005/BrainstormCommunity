import styles from './modules/SuggestionForm.module.scss';
import Image from 'next/image';

interface SuggestionFormProps{
onClick:()=>void;
commentContent:string;
onChange:(value:string)=>void;
}

const SuggestionForm:React.FC<SuggestionFormProps>=({onClick,commentContent,onChange})=>
(
    <div className={styles['container']}>
        <textarea className={styles["suggestion-textfield"]} value={commentContent} onChange={(e)=>onChange(e.target.value)} placeholder="Type here your wise suggestion"/>
    <button className={styles['suggest-button']} onClick={onClick}>
    <div className={styles['suggest-icon-wrapper']}>
         <Image
          src={'/suggest.svg'}
          alt="Arrow-up-icon"
          layout="responsive"
          width="13"
          height="13"
        />
         </div> 
        <span className={styles['suggest']}>Suggest</span></button>
    </div>  
)


export default SuggestionForm;