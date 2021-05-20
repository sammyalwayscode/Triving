import React from "react";
import { app } from "../Base/Base";

const BasePush = app.firestore().collection("AuthView");
function Auth() {
  const [toogle, setToggle] = React.useState(false);
  const [imageFile, setImageFile] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [eachUser, setEachUser] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  const toggling = () => {
    setToggle(!toogle);
  };

  const ImageUpload = async (e) => {
    const fileRef = e.target.files[0];
    const storageRef = app.storage().ref();
    const childRef = storageRef.child(fileRef.name);
    await childRef.put(fileRef);
    setImageFile(childRef.getDownloadURL());
  };

  const SignUp = async () => {
    const NewUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (NewUser) {
      await BasePush.doc(NewUser.user.uid).set({
        name,
        email,
        password,
        bio,
        Avatar: await imageFile,
      });
      setName("");
      setEmail("");
      setPassword("");
      setBio("");
      alert("Logged In Sucessfully");
    }
  };

  const SignIn = async () => {
    const User = await app.auth().signInWithEmailAndPassword(email, password);

    if (User) {
      alert("Signed In Sucessfully");
    }
  };

  const LogOut = async () => {
    await app.auth().signOut();
  };

  const GetUser = async () => {
    const NewUser = await app.auth().currentUser;

    if (NewUser) {
      BasePush.doc(NewUser.uid)
        .get()
        .then((doc) => {
          setEachUser(doc.data());
        });
    }
  };

  React.useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUserData(user);
    });

    GetUser();
  }, []);

  return (
    <center>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        {toogle ? (
          <div>
            <input type="file" onChange={ImageUpload} />
            <br />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <textarea
              placeholder="Short Bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <br />
            <button onClick={SignUp}>Sign Up</button>
            <br />
            <span>
              Already a user <strong onClick={toggling}>Sign In</strong>
            </span>
          </div>
        ) : (
          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <button onClick={SignIn}>Sign In</button>
            <br />
            <span>
              Not a user <strong onClick={toggling}>Sign Up</strong>
            </span>
          </div>
        )}
        <div>
          <div> {userData && userData.email} </div>
          <div> {userData && userData.uid} </div>
          <div>
            Name:<div> {eachUser && eachUser.name} </div>
          </div>
          <div>
            Email:<div> {eachUser && eachUser.email} </div>
          </div>
        </div>
        <button onClick={LogOut}>Log Out</button>
      </div>
    </center>
  );
}

export default Auth;
