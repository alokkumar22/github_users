import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Users = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const style = {
    backgroundColor: "black",
    padding: "0.4rem",
    borderRadius: "1rem",
    margin: "0.3rem",
  };
  const getFormattedDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log(`useeffect ${props.userName}`);
    if (props.userName) {
      setIsLoading(true);
      fetch(`https://api.github.com/users/${props.userName}`)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            setIsLoading(false);
            setIsError(true);
            setErrorMessage(`${response.status} ${response.statusText}`);
          }
        })
        .then((data) => {
          setIsLoading(false);
          setShowModal(true);
          setUsers([data]);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(err.message);
        });
    }
  }, [props.userName]);

  if (isError) {
    return <div>{errorMessage}</div>;
  }
  if (isLoading) {
    return <div>Loading ... </div>;
  }
  return (
    <div>
      {showModal && <Modal closeModal={closeModal}>Results</Modal>}
      {users.map((user) => (
        <li key={user.id}>
          <img src={user.avatar_url} alt={user.name} />
          <div
            style={{
              color: "white",
            }}
          >
            <h2>{user.name}</h2>
            <p style={style}>
              Github id :<strong>{user.id}</strong>{" "}
            </p>
            <p style={style}>
              profile picture url : <strong>{user.avatar_url}</strong>
            </p>
            <p style={style}>
              profile link : <strong>{user.url}</strong>
            </p>
            <p style={style}>
              followers count : <strong>{user.followers}</strong>{" "}
            </p>
            <p style={style}>
              following count : <strong>{user.following}</strong>
            </p>
            <p style={style}>
              account created on :{" "}
              <strong>{getFormattedDate(user.created_at)}</strong>
            </p>
            <p style={style}>
              account updated on :{" "}
              <strong>{getFormattedDate(user.created_at)}</strong>
            </p>
            <p style={style}>
              public repos count : <strong>{user.public_repos}</strong>
            </p>
            <p style={style}>
              is she hireable :<strong>{user.hireable}</strong>{" "}
            </p>
          </div>
        </li>
      ))}
    </div>
  );
};

export default Users;
