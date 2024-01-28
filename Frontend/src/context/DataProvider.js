import { createContext, useState } from "react";
export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [userName, setUser] = useState("");
  return (
    <DataContext.Provider
      value={{
        userName,
        setUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
