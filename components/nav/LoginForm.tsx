// @flow
"use client";

import * as React from "react";
import { IoLogInOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function LoginForm() {
  const pathName = usePathname();

  const supabase = createClient();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + pathName,
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleLogin}
    >
      <IoLogInOutline />
      Login
    </Button>
  );
}
