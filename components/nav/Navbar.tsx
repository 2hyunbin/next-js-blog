"use client";

import React from "react";
import Link from "next/link";
import { LoginForm } from "@/components/nav/LoginForm";
import { useUser } from "@/lib/store/user";
import { Profile } from "@/components/nav/Profile";
export default function Navbar() {
  const user = useUser((state: any) => state.user);

  return (
    <nav className="flex items-center justify-between">
      <div className="group">
        <Link href="/" className="text-2xl font-bold">
          Daily Blog
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-green-500"></div>
      </div>

      {user?.email ? <Profile /> : <LoginForm />}
    </nav>
  );
}
