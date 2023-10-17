"use client";

import { useEffect, useState } from "react";

import { Hanko } from "@teamhanko/hanko-elements";

const RootPage = () => {
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements")
      .then(({ Hanko }) => {
        setHanko(new Hanko(process.env.NEXT_PUBLIC_HANKO_API_URL ?? ""));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>RootPage</div>;
};
export default RootPage;
