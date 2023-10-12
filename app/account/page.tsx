"use client";

import { useEffect } from "react";

import { Hanko } from "@teamhanko/hanko-elements";

const hanko = new Hanko(
  "https://d8db021b-5052-4b12-a0ed-a372e35a8c50.hanko.io"
);

const Account = () => {
  useEffect(() => {
    (async () => {
      const user = await hanko.user.getCurrent();
      console.log(user);
    })();
  }, []);

  return <div>Hello </div>;
};
export default Account;
