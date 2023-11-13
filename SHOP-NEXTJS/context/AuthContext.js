import { NEXT_API } from "@/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userOrder, setUserOrder] = useState([]);

  const router = useRouter();

  
  const { data: session } = useSession();
  const token = session?.accessToken;

  // login user
  const login = async ({ username, password }) => {
    setError(null); // reset the error state for setting state later
    setIsLoading(true);
    const response = await fetch(`${NEXT_API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    let data = await response.json();

    console.log("Data user login " + JSON.stringify(data));

    if (response.ok) {
      setUser({role: data.user});
      toast.success("Login succesfull")
    } else {
      toast.error(data.message);
    }
    setIsLoading(false);
  };



  return (
    <AuthContext.Provider
      value={{ user, error, login,  isLoading, userOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
