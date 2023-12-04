import React from "react";
import styles from "./Auth.module.css";
import {
  clearUser,
  loginUser,
  setUser,
} from "../../../redux/slices/authSlice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { users } from "../../layout/sidebar/users/Users";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status, user } = useSelector((state) => state.auth);
  const [isRegForm, setIsRegForm] = React.useState(false);
  const [authData, setAuthData] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  React.useEffect(() => {
    const auth = getAuth();
    const unListen = onAuthStateChanged(auth, (authUser) => {
      if (authUser)
        dispatch(
          setUser({
            id: authUser.uid,
            avatar: users[1].avatar,
            name: authUser.displayName,
          })
        );
      else {
        dispatch(clearUser);
      }
    });
    return () => {
      unListen();
    };
  }, []);

  React.useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ isRegForm, authData }));
    setAuthData({
      email: "",
      password: "",
      name: "",
    });
  };

  return (
    <>
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorText}>{error}</span>
        </div>
      )}

      <form className={styles.formContainer} onSubmit={handleLogin}>
        <div className={styles.inputField}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={authData.name}
            onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={authData.email}
            onChange={(e) =>
              setAuthData({ ...authData, email: e.target.value })
            }
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={authData.password}
            onChange={(e) =>
              setAuthData({ ...authData, password: e.target.value })
            }
          />
        </div>
        <div className={styles.submitButtonsContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={() => setIsRegForm(false)}
          >
            Auth
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={() => setIsRegForm(true)}
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Auth;
