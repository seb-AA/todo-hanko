"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Hanko, register } from "@teamhanko/hanko-elements";

const hankoApi = "https://d8db021b-5052-4b12-a0ed-a372e35a8c50.hanko.io";

export default function Login() {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  const registerUser = async (id: string, email: string) => {
    await fetch(`/api/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        email,
      }),
    });
  };

  const redirectAfterLogin = useCallback(() => {
    router.replace("/todos");
  }, [router]);

  useEffect(() => {
    //
    register(hankoApi ?? "")
      .then(({ hanko }) => {
        setHanko(hanko);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    hanko?.onAuthFlowCompleted(() => {
      // hanko.user.getCurrent().then(({ id, email }) => {
      //   registerUser(id, email);
      // });

      redirectAfterLogin();
    });
  }, [hanko, redirectAfterLogin]);

  return (
    <div className="flex min-h-screen justify-center items-center bg-slate-50">
      <div className="bg-white p-5 rounded-2xl shadow-md">
        <hanko-auth />
      </div>
    </div>
  );
}
