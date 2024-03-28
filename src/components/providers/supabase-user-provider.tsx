"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthUser } from "@supabase/supabase-js";
import { TSubscriptions } from "@/lib/drizzle/schema/types";
import { createClient } from "@/lib/supabase/client";
import { getUserSubscriptionStatus } from "@lib/queries";
import { toast } from "../ui/use-toast";

type UserContextProps = {
  user: AuthUser | null;
  subscription: TSubscriptions | null;
};
const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<TSubscriptions | null>(null);

  useEffect(() => {
    const fetchUserAndSubscription = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          const { data, error } = await getUserSubscriptionStatus(user.id);
          if (data) setSubscription(data);
          if (error) {
            toast({
              title: "🤒 Uh oh! Something went wrong.",
              description:
                "Please refresh the page or contact us if the issue persists.",
            });
          }
        } else {
          setUser(null);
          setSubscription(null);
        }
      } catch (error) {
        console.log("🔴 Error from User Context");
      }
    };

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(fetchUserAndSubscription, 0);
    });

    // return () => {
    //   authListener.data.subscription.unsubscribe();
    // };
  }, []);

  const value = { user, subscription };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser Hook must be used within the Supabase User Provider",
    );
  }
  return context;
}
