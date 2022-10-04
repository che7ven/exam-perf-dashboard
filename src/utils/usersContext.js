import React, { useState } from "react";

const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
  const [user, setUser] = useState("");

  return (
    <UsersContext.Provider value={{ user, setUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
