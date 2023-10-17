"use client";

import { useEffect, useState } from "react";

import { register } from "@teamhanko/hanko-elements";

export const Profile = () => {
  const [openState, setOpenState] = useState(false);

  useEffect(() => {
    register(process.env.NEXT_PUBLIC_HANKO_API_URL ?? "").catch((error) => {
      console.log(error);
    });
  }, []);

  const openProfile = () => {
    setOpenState(!openState);
  };

  return (
    <>
      <button type="button" onClick={openProfile}>
        Profile
      </button>
      {openState && (
        <div className=" absolute top-14 ">
          <section className=" w-[450px] h-auto rounded-2xl bg-white p-5">
            <hanko-profile />
          </section>
        </div>
      )}
    </>
  );
};
