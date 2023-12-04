import React from "react";
import styles from "./AuthorizedUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../../redux/slices/authSlice/authSlice";

const AuthorizedUser = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={styles.currentUserContainer}>
      {user ? (
        <>
          <div className={styles.avatarAndNameContainer}>
            <img src={user.avatar} width="20px" height="20px" />
            <span>{user.name}</span>
          </div>
          <button
            onClick={() => {
              signOut(auth).then(() => {
                dispatch(clearUser());
              });
            }}
          >
            SIGN OUT
          </button>
        </>
      ) : (
        "No User"
      )}
    </div>
  );
};

export default AuthorizedUser;
