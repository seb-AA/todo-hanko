"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Hanko } from "@teamhanko/hanko-elements";

const hankoApi = "https://d8db021b-5052-4b12-a0ed-a372e35a8c50.hanko.io";

export const Logout = () => {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
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
