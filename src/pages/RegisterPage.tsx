import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      {" "}
      <RegisterForm className="max-w-xl w-full" />
    </div>
  );
}
