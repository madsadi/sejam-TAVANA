import React, { useContext, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useRouter } from "next/router";
import { IdpContext } from "../../pages/[[...code]]";

export default function Login() {
  const { setLevel } = useContext<any>(IdpContext);
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem(
      "RefCode",
      `${
        router.asPath !== "/" && router.asPath !== "/[[...code]]"
          ? router.asPath.split("/").at(-1)
          : ""
      }`
    );
  }, [router.asPath]);

  return (
    <>
      <h2 className={"text-center"}>ورود</h2>
      <div className={"mt-auto text-center"}>
        <button
          className={"button mt-16"}
          onClick={() => void auth.signinRedirect()}
        >
          <div className={"flex items-center mx-auto w-fit py-2 sm:py-1"}>
            ورود
          </div>
        </button>
        <p
          className={"mt-4 hover-button mx-auto cursor-pointer"}
          onClick={() => setLevel("mobileEntry")}
        >
          آیا مایل به ایجاد حساب هستید؟
        </p>
      </div>
    </>
  );
}
