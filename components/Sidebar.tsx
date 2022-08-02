import styles from "./modules/Sidebar.module.scss";
import Image from "next/image";
import { useState } from "react";
import Link from "next/Link";
import Search from "./Search";

interface SidebarProps {
  itemSelected: string;
  value: string;
  onChange: (e: React.SyntheticEvent<EventTarget>) => void;
  onSubmit: () => void;
  action: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  itemSelected,
  value,
  onChange,
  onSubmit,
  action,
}) => {
  const [hoveredItem, setHoveredItem] = useState("");

  return (
    <div className={styles["sidebar-container"]}>
      <Search
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        action={action}
      />
      <div className={styles["menu-container"]}>
        <span className={styles["menu-header"]}>menu</span>
        <Link href={"/questions"}>
          <div
            className={
              itemSelected == "questions"
                ? styles["item-selected-container"]
                : styles["questions-container"]
            }
            onMouseEnter={() => setHoveredItem("questions")}
            onMouseLeave={() => setHoveredItem("")}
          >
            <div className={styles["questions-icon-wrapper"]}>
              <Image
                src={
                  itemSelected == "questions" || hoveredItem == "questions"
                    ? "/list-icon-orange.svg"
                    : "/list-icon.svg"
                }
                alt="List icon"
                layout="responsive"
                width="18"
                height="18"
              />
            </div>
            <span
              className={
                itemSelected == "questions"
                  ? styles["item-selected-text"]
                  : styles["questions"]
              }
            >
              Questions
            </span>
          </div>
        </Link>
        <Link href={"/tags"}>
          <div
            className={
              itemSelected == "tags"
                ? styles["item-selected-container"]
                : styles["tags-container"]
            }
            onMouseEnter={() => setHoveredItem("tags")}
            onMouseLeave={() => setHoveredItem("")}
          >
            <div className={styles["tags-icon-wrapper"]}>
              <Image
                src={
                  itemSelected == "tags" || hoveredItem == "tags"
                    ? "/tag-icon-orange.svg"
                    : "/tag-icon.svg"
                }
                alt="Tag icon"
                layout="responsive"
                width="18"
                height="18"
              />
            </div>
            <span
              className={
                itemSelected == "tags"
                  ? styles["item-selected-text"]
                  : styles["tags"]
              }
            >
              Tags
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
