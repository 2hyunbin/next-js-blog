import React from "react";
import { useUser } from "@/lib/store/user";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { createClient } from "@/utils/supabase/client";

export function Profile() {
  const user = useUser((state: any) => state.user);
  const setUser = useUser((state: any) => state.setUser);
  const supabase = createClient();

  const isAdmin = user.user_metadata.role === "admin";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={user?.user_metadata.avatar_url}
          alt={user?.user_metadata.user_name}
          width={50}
          height={50}
          className="rounded-full ring-2 ring-green-500"
        />
      </PopoverTrigger>
      <PopoverContent className="p-2 space-y-3 divide-y">
        <div className="px-4 text-sm">
          <p>{user?.user_metadata?.user_name}</p>
          <p className="text-gray-500">{user?.user_metadata?.email}</p>
        </div>
        {isAdmin && (
          <Link href="/dashboard" className="block">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between"
            >
              DashBoard
              <DashboardIcon />
            </Button>
          </Link>
        )}
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between"
          onClick={handleLogout}
        >
          Log out
          <LockOpen1Icon />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
