import { Outlet } from "react-router";

import React from "react";

export default function PublicLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen">
      <main className="">
        {children}
        <Outlet />
      </main>
    </div>
  );
}
