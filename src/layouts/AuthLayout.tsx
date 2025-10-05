import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

export default function AuthLayout() {
  useEffect(() => {
    guardLogin();
  }, []);
  const navigate = useNavigate();

  function guardLogin() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast.error("You must login first to continue");
      }, 100);
    }
  }

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
