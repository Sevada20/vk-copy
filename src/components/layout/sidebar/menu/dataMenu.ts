import { IoMdHome } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";

interface IDataMenuItem {
  title: string;
  link: string;
  icon: IconType;
}
export const dataMenu: IDataMenuItem[] = [
  {
    title: "My page",
    link: "/profile",
    icon: IoMdHome,
  },
  {
    title: "Friends",
    link: "/friends",
    icon: FaUserFriends,
  },
  {
    title: "News",
    link: "/",
    icon: IoNewspaperOutline,
  },
];
