"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useUser } from "@/lib/store/user";

export default function SessionProvider() {
  const setUser = useUser((state: any) => state.setUser);
  const supabase = createClient();

  const readUserSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user);
  };

  useEffect(() => {
    readUserSession();
    //eslint-disable-next-line
  }, []);

  return <></>;
}
