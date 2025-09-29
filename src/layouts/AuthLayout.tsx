import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <header>
        <nav>
          <h1>Navigation</h1>
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
