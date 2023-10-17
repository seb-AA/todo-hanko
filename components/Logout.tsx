"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Hanko } from "@teamhanko/hanko-elements";

export const Logout = () => {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(process.env.NEXT_PUBLIC_HANKO_API_URL ?? ""))
    );
  }, []);

  const logout = () => {
    hanko?.user
      .logout()
      .then(() => {
        router.push("/");
        router.refresh();
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
};
