import UserContext from "./UserContext";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}