import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase_client";

export const AuthContext = createContext<{
  currentUser: User | null;
  session: Session | null;
}>({
  currentUser: null,
  session: null,
});

export const AuthContextProvider = (props) => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
      setCurrentUser(session?.user ?? null);
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
