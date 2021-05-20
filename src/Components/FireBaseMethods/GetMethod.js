import React from "react";
import { app } from "../Base/Base";

const GetBase = app
  .firestore()
  .collection("NewPosting")
  .orderBy("Time", "desc");
function GetMethod() {
  const [getPost, setGetPost] = React.useState([]);

  const GetBasePost = async () => {
    await GetBase.onSnapshot((snaped) => {
      const BaseBoy = [];
      snaped.forEach((doc) => {
        BaseBoy.push({ ...doc.data(), id: doc.id });
      });
      setGetPost(BaseBoy);
    });
  };

  React.useEffect(() => {
    GetBasePost();
  }, []);
  return (
    <div>
      {getPost.map(({ id, Name, Email, Avatar }) => (
        <div key={id}>
          <img
            src={Avatar}
            alt=""
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
          />
          <h2> {Name} </h2>
          <div> {Email} </div>
        </div>
      ))}
    </div>
  );
}

export default GetMethod;
