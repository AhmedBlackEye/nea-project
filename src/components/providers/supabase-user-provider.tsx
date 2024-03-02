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

type Props = {
  children: ReactNode;
};

export function SupabaseUserProvider({ children }: Props) {
  const supabase = createClient();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<TSubscriptions | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data, error } = await getUserSubscriptionStatus(user.id);
        if (data) setSubscription(data);
        if (error) {
          toast({
            title: "Unexpected Error",
            description:
              "🤒Oppse! An unexpected error happened. Try again later.",
          });
        }
      }
    };
    getUser();
  }, [supabase]);
  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
}

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: TSubscriptions | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
});
export const useUser = () => {
  return useContext(SupabaseUserContext);
};
