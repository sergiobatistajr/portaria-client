"use client";
import LoginComponent from "@/components/login.component";
import { useAuth } from "@/providers/user.provider";

export default function Home() {
  const { user } = useAuth();
  return (
    <main>
      <h1>Home</h1>
      {user?.username ? user.username : "guest"}
      <LoginComponent />
    </main>
  );
}
