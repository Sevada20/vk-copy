import { useNavigate } from "react-router-dom";
import styles from "./Users.module.css";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface IUser {
  id: number;
  avatar: string;
  name: string;
  isInNetwork: boolean;
}

export const users: IUser[] = [
  {
    id: 1,
    avatar:
      "https://media.licdn.com/dms/image/D4D03AQHHgy4JJ_l3Sg/profile-displayphoto-shrink_400_400/0/1670274745938?e=1701907200&v=beta&t=BivgJKtqABO3hEZ0Oxla31jUTh4J7WUJTJOfrDxQiMw",
    name: "Sevada Poghosyan",
    isInNetwork: true,
  },
  {
    id: 2,
    avatar:
      "data:image/jpeg;base64,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",
    name: "Mark Zuckerberg",
    isInNetwork: false,
  },
  {
    id: 3,
    avatar:
      "https://www.ctvnews.ca/content/dam/ctvnews/en/images/2023/11/30/portugal-s-cristiano-ronaldo-1-6667436-1701362918050.jpg",
    name: "Cristiano Ronaldo",
    isInNetwork: true,
  },
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className={styles.userContainer}>
      {users.map((userItem) => {
        return (
          <div
            key={userItem.id}
            onClick={() => navigate(`/profile/${userItem.id}`)}
            className={styles.userItemContainer}
          >
            <img src={userItem.avatar} width="50px" height="50px" />
            {userItem.isInNetwork &&
              (user ? <div className={styles.statusCircle}></div> : "")}
            <span>{userItem.name}</span>
          </div>
        );
      })}
      <div
        className={styles.userItemContainer}
        onClick={() => navigate("/messages")}
      >
        <TiMessages />
        <span>Messages</span>
      </div>
    </div>
  );
};

export default Users;
