import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="w-full h-screen">
      <main className="flex justify-center items-center h-screen">
        <Outlet />
      </main>
    </div>
  );
}
