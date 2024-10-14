'use client'

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // checks if the user is logged in or not
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/pages/login");
    }
  }, [isLoggedIn, router]); // runs the effect when the component loads 

  return null;
};

export default Page;
