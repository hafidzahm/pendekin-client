"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { http } from "@/helpers/axios";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Fullname field must be at least 2 characters.",
    })
    .nonempty({ message: "Fullname field is required." }),
  email: z
    .email({ message: "Email field must be an email" })
    .nonempty({ message: "Email field is required." }),
  password: z.string().min(2, {
    message: "Password field must be at least 5 characters.",
  }),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      const response = await http.post("/users", {
        name: values.fullName,
        email: values.email,
        password: values.password,
      });

      console.log(response);
      setTimeout(() => setLoading(false), 200);

      if (response.status === 201) {
        toast.success(
          `Account with name ${response.data.name} created successfully`
        );
        navigate("/login");
      } else {
        console.log(response.status, "error");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.code === "ERR_BAD_REQUEST") {
        console.log("BadRequest");
        toast.error("Invalid email or password");
      }

      if (error instanceof AxiosError && error.code === "ERR_NETWORK") {
        console.log("NetworkError");
        toast.error("Check your network connection");
      }
      setLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register an account</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Fuadi Pendekin" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="pendekin@mail.co" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="your_password_here" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-1">
                    Creating Account
                    <span className="flex gap-0.5">
                      <span className="animate-[bounce_1s_ease-in-out_0s_infinite]">
                        .
                      </span>
                      <span className="animate-[bounce_1s_ease-in-out_0.2s_infinite]">
                        .
                      </span>
                      <span className="animate-[bounce_1s_ease-in-out_0.4s_infinite]">
                        .
                      </span>
                    </span>
                  </span>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Have registered an account?{" "}
            <Link to={"/login"} className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
