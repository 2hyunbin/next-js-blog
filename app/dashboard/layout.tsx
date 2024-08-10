import React, { ReactNode } from "react";
import Navlinks from "@/app/dashboard/component/Navlinks";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5">
      <Navlinks />
      {children}
    </div>
  );
}
