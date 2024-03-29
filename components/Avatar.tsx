import styles from "./modules/Avatar.module.scss";
import Image from "next/image";

interface AvatarProps {
  avatarUrl: string;
  openQuestion: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ avatarUrl, openQuestion }) => (
  <div
    className={
      openQuestion ? styles.avatarWrapperOpenQuestion : styles.avatarWrapper
    }
  >
    <Image
      src={avatarUrl}
      alt="Author's photo/avatar"
      layout="fill"
      objectFit="cover"
    />
  </div>
);

export default Avatar;
