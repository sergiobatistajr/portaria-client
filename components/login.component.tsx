"use client";
import { apiConstants } from "@/constants";
import { portariaFetch } from "@/lib.module";
import { useAuth } from "@/providers/user.provider";
import { useForm } from "react-hook-form";

interface FormInput {
  username: string;
  password: string;
}
export default function LoginComponent() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      username: "admin",
      password: "12345678",
    },
  });

  async function onSubmit(input: FormInput) {
    await login(input);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-screen"
    >
      <input type="text" placeholder="Username" {...register("username")} />
      <input type="password" placeholder="Password" {...register("password")} />
      <button className="bg-cyan-600 border-1 border-cyan-800" type="submit">
        Login
      </button>
    </form>
  );
}
