"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/home");
  };

  return (
    <div className="pt-5">
      <div className="navbar bg-blue-100 shadow-xl w-[97%] m-auto rounded-md">
        <div className="flex-1 text-3xl">
          <a className="btn btn-ghost text-3xl">SPEED</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-3xl font-bold">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <details>
                <summary>Menu</summary>
                <ul className="bg-blue-200 rounded-t-none p-2 text-lg">
                  <li>
                    <Link className="hover:bg-blue-300" href="/pages/browse">Browse</Link>
                  </li>
                  {!isLoggedIn ? (
                    <li>
                      <Link className="hover:bg-blue-300" href="/pages/login">Login</Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link className="hover:bg-blue-300" href="/pages/submit">Submit</Link>
                      </li>
                      <li>
                        <Link className="hover:bg-blue-300" href="/pages/moderate">Moderate</Link>
                      </li>
                      <li>
                        <Link className="hover:bg-blue-300" href="/pages/analyse">Analyse</Link>
                      </li>
                      <li>
                        <Link className="hover:bg-blue-300" href="/pages/admin">Admin</Link>
                      </li>
                      <li>
                        <button className="hover:bg-blue-300" onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
