import { Outlet, useNavigate } from "react-router";

import React, { useEffect } from "react";
import { toast } from "sonner";

export default function PublicLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  useEffect(() => {
    guardLogin();
  }, []);
  const navigate = useNavigate();

  function guardLogin() {
    const token = localStorage.getItem("access_token");

    if (token) {
      setTimeout(() => {
        navigate("/dashboard");

        toast.success(`Welcome back, ${localStorage.getItem("name")!}`);
      }, 100);
    }
  }
  return (
    <div className="w-full h-screen">
      <main className="">
        {children}
        <Outlet />
      </main>
    </div>
  );
}
