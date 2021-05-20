import React from "react";
import { app } from "../Base/Base";

const PostBase = app.firestore().collection("NewPosting");
function PostMethod() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [imageFile, setImageFile] = React.useState("");

  const PostImg = async (e) => {
    const fileRef = e.target.files[0];
    const storageRef = app.storage().ref();
    const childRef = storageRef.child(fileRef.name);
    await childRef.put(fileRef);
    setImageFile(await childRef.getDownloadURL());
  };

  const postAllFiles = async () => {
    await PostBase.doc().set({
      Name: name,
      Email: email,
      Avatar: await imageFile,
      Time: Date.now(),
    });
    setEmail("");
    setImageFile("");
    setName("");
  };

  return (
    <div>
      <div>
        <input type="file" onChange={PostImg} />
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
        <button onClick={postAllFiles}>Summit</button>
      </div>
    </div>
  );
}

export default PostMethod;
