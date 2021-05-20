import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { app } from "../Base/Base";

const userProfile = app.firestore().collection("user");

const HomeScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [task, setTask] = useState("");

  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(null);
  const [getUserData, setGetUserData] = useState(null);
  const [readUserData, setReadUserData] = useState([]);

  const SignUpUser = async () => {
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await userProfile.doc(newUser.user.uid).set({
      name,
      email,
      password,
      bio,
    });
  };

  const SignInUser = async () => {
    await app.auth().signInWithEmailAndPassword(email, password);
  };

  const getUser = async () => {
    const newUser = await app.auth().currentUser;
    // console.log(newUser.uid);

    if (newUser) {
      userProfile
        .doc(newUser.uid)
        .get()
        .then((doc) => {
          setGetUserData(doc.data());
        });
    }
  };

  const SignOutUser = async () => {
    await app.auth().signOut();
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const AddNewTask = async () => {
    const newUser = app.auth().currentUser;

    if (newUser) {
      userProfile.doc(newUser.uid).collection("Task").doc().set({
        task,
      });
    }
  };

  const ReadNewTask = async () => {
    const newUser = app.auth().currentUser;

    if (newUser) {
      userProfile
        .doc(newUser.uid)
        .collection("Task")

        .onSnapshot((snapshot) => {
          const file = [];
          snapshot.forEach((doc) => {
            file.push(doc.data());
          });
          setReadUserData(file);
          console.log(readUserData);
        });
      console.log(readUserData);
    }
  };

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUserData(user);
      // console.log(userData);
    });
    getUser();
    AddNewTask();
    ReadNewTask();
  }, []);

  return (
    <div>
      <center>This is Home</center>
      <center>
        <Button onClick={SignOutUser}>Sign Out</Button>
      </center>
      <br />
      <br />
      <br />
      <center>
        {toggle ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
              width: "300px",
            }}
          >
            <input
              style={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <br />
            <input
              style={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              style={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <input
              style={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
              placeholder="biography"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <br />
            <Button onClick={SignUpUser}>Sign Up</Button>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div>Already have an an Account, please</div>
              <div
                style={{ marginLeft: "5px", color: "blue", cursor: "pointer" }}
                onClick={onToggle}
              >
                sign in here
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
              width: "300px",
            }}
          >
            <input
              style={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              style={{
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
              }}
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <br />
            <Button onClick={SignInUser}>Sign In</Button>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div>Don't have an an Account, please</div>
              <div
                style={{ marginLeft: "5px", color: "blue", cursor: "pointer" }}
                onClick={onToggle}
              >
                sign Up here
              </div>
            </div>
          </div>
        )}
      </center>
      <br />
      <br />
      <br />
      <center>
        {" "}
        <h2> {userData && userData.email} </h2>
        <h1> {getUserData && getUserData.name} </h1>
        <h1>Password: {getUserData && getUserData.password} </h1>
        <div> {getUserData && getUserData.bio} </div>
      </center>
      <br />
      <br />
      <br />
      <center>
        <input
          style={{
            width: "50%",
            height: "40px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            // marginLeft: "30px",
          }}
          placeholder="task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <br />
        <Button
          onClick={() => {
            AddNewTask();
            setTask("");
          }}
        >
          Add new Task
        </Button>
      </center>
      <br />
      <br />
      <div>
        {readUserData.map(({ id, task }) => (
          <div key={id}>
            <h3>{task} </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
