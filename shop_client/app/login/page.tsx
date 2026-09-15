"use client";
import { useState } from "react";
import { login } from "@/shared/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      router.push("/");
    } catch {}
  };

  return (
    <div style={{ color: "black" }}>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
