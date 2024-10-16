"use client";

import React, { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {

  const { isLoggedIn } = useAuth();

  const [awaitingModeration, setAwaitingModeration] = useState<number | null>(null);
  const [awaitingAnalysis, setAwaitingAnalysis] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {
    
    setLoading(true);

    const fetchAwaitingModeration = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/count/Unmoderated`);
        const data = await response.json();
        setAwaitingModeration(data);
      } catch (error) {
        console.error('Error fetching unmoderated count: ', error);
      }
    }

    const fetchAwaitingAnalysis = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/count/Moderated`);
        const data = await response.json();
        setAwaitingAnalysis(data);
      } catch (error) {
        console.error('Error fetching moderated count:', error);
      }
    }

    const fetchAllData = async () => {
      setLoading(true);
      fetchAwaitingModeration();
      fetchAwaitingAnalysis();
      setLoading(false);
    }

    fetchAllData();

  }, []);

  if (loading) {
    return (
    <div className="min-h-screen flex flex-col items-center pt-5"> {/* Added padding-top to avoid overlap with navbar */}
    
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <p>Loading...</p>
      </div>

    </div>
    )
  }

  if (!isLoggedIn) {
    return <div>Not logged in?</div>;
  }

  // When logged in (as admin?), show all notifications

  return (

  <div className="min-h-screen flex flex-col items-center pt-5"> {/* Added padding-top to avoid overlap with navbar */}
    
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      { awaitingModeration ? (
      <>
        <p className="block mb-2">
        You have {awaitingModeration} Article{awaitingModeration !== 1 && ("s")} awaiting Moderation.
        </p>
      </>
      ) : (
        <p className="block mb-2">
        No articles are currently awaiting Moderation.
        </p>
      )}

      { awaitingAnalysis ? (
      <>
        <p className="block mb-2">
        You have {awaitingAnalysis} Article{awaitingAnalysis !== 1 && ("s")} awaiting Analysis.
        </p>
      </>
      ) : (
        <p className="block mb-2">
        No articles are currently awaiting Analysis.
        </p>
      )}

      

    </div>
  
  </div>
  )

};

export default Dashboard;
