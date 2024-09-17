import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-zinc-400 shadow-lg">
      <div className="flex-1 text-3xl">
        <a className="btn btn-ghost text-3xl">SPEED</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2 text-lg">
                <li>
                  <Link href="/pages/search">Search</Link>
                </li>
                <li>
                  <Link href="/pages/submit">Submit</Link>
                </li>
                <li>
                  <Link href="/pages/review">Review</Link>
                </li>
                <li>
                  <Link href="/pages/login">Login</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
