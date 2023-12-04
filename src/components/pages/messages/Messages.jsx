import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addMessage,
  setMessages,
} from "./../../../redux/slices/messageSlice/messageSlice";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import styles from "./Messages.module.css";

const Messages = () => {
  const db = getFirestore();
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.auth.user);
  const messagesList = useSelector((state) => state.messages.messagesList);
  const error = useSelector((state) => state.messages.error);
  const dispatch = useDispatch();

  const addMessageHandler = () => {
    dispatch(addMessage({ userId: user.id, message }));
    setMessage("");
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (doc) => {
      const newMessages = doc.docs.map((d) => d.data());
      dispatch(setMessages(newMessages));
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      {error && <span className={styles.errorContainer}>{error}</span>}
      <div className={styles.mainContainer}>
        <div className={styles.messagesContainer}>
          {messagesList.map((msg, index) => (
            <div key={index}>
              <div
                style={{
                  marginTop: "10px",
                  textAlign: msg.userId === user?.id ? "right" : "",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.userId === user.id ? "flex-end" : "flex-start",
                  }}
                >
                  <span style={{ marginRight: "5px" }}>{user.name}</span>
                  <img
                    src={user.avatar}
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
                <div>
                  <span
                    style={msg.userId === user?.id ? { color: "#1976d2" } : {}}
                  >
                    {msg.message}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputField}
            placeholder="Type Something"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <div className={styles.iconContainer} onClick={addMessageHandler}>
            <IoIosSend className={styles.icon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
