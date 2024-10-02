"use client";

import React from "react";

import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <div>dashboard:D</div>;
  }

  // When logged in (as admin?), show all notifications


  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      <label htmlFor="title" className="block mb-2">
      You have 2 Articles awaiting Moderation
      </label>
      
  </div>
  )

};

export default Dashboard;
