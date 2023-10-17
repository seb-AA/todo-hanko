"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Hanko, register } from "@teamhanko/hanko-elements";

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
    router.replace(`${process.env.NEXT_PUBLIC_HANKO_AFTER_SIGN_IN_URL}`);
  }, [router]);

  useEffect(() => {
    //
    register(process.env.NEXT_PUBLIC_HANKO_API_URL ?? "")
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
    <div className="flex min-h-screen justify-center items-center bg-gray-900">
      <div className="bg-gray-50 p-5 rounded-2xl shadow-md">
        <div className="text-gray-900">
          Auth by{" "}
          <a
            href="https://hanko.io/"
            target="_blank"
            className="font-semibold hover:underline text-red-700"
          >
            Hanko
          </a>
        </div>
        <hanko-auth />
      </div>
    </div>
  );
}
