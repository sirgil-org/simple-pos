import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase_client";

interface IUserData {
  vendor_id: string;
  name: string;
  avatar_url?: string;
}
export const AuthContext = createContext<{
  currentUser: User | null;
  session: Session | null;
  userData: IUserData;
  getProfile: (id: string) => void;
}>({
  currentUser: null,
  session: null,
  userData: null,
  getProfile: null,
});

export const AuthContextProvider = (props) => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState();

  const getProfile = async (id) => {
    const { data } = await supabase
      .from("vendors")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (data) {
      console.log("getting data. ********");
      setUserData(data);
      console.log("data from frist... ", data);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUserSession(session);
      setCurrentUser(session?.user ?? null);

      if (session?.user) {
        getProfile(session.user.id);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        setUserSession(session);
        setCurrentUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription;
    };
  }, []);

  const value = {
    userSession,
    currentUser,
    userData,
    getProfile,
  };

  return (
    <AuthContext.Provider value={value} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a AuthContextProvider.");
  }
  return context;
};
