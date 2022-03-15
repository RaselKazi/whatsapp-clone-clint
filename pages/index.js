import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
export default function Home() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    } else {
      router.push("/messages");
    }
  }, []);
  return <></>;
}
