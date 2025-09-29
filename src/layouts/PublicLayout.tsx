import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
}
