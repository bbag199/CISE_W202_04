import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // If no token is found, redirect to the login page
      router.push("/pages/login");
    }
  }, []);
};
