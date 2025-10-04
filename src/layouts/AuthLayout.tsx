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

  function onLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");

    navigate("/");
    setTimeout(() => {
      toast.success("Bye bye, comeback later!");
    }, 100);
  }
  return (
    <div>
      <header>
        <nav>
          <h1>Navigation</h1>
          <Button onClick={onLogout}>Logout</Button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
  );
}
