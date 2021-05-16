import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Users from "./Users";

const App = () => {
  const [userName, setUserName] = useState("");

  const setUserNameFn = (userName) => {
    console.log(userName);
    setUserName(userName);
  };
  return (
    <div className="App">
      <SearchBox setUserNameFn={setUserNameFn} />
      <Users userName={userName} />
    </div>
  );
};

export default App;
