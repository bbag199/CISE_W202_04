"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRequireAuth } from "../../../hooks/useRequireAuth";

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  publicationYear: string;
  doi: string;
  claim: string;
  evidence: string;
  rating: number[];
  status: string;
}

const BrowseAnalyze = () => {
  useRequireAuth();

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8082/articles/status/moderated"
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen mt-16">
      <div className="flex justify-center items-center space-x-4 xl:w-3/4 mx-auto">
        <span className="font-bold text-xl flex-shrink-0 whitespace-nowrap">
          Browse moderated articles
        </span>
      </div>

      <div className="mt-16">
        <div className="px-4 md:px-8">
          <table className="min-w-full table-auto border border-blue-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left font-bold">Title</th>
                <th className="border px-4 py-2 text-left font-bold">
                  Authors
                </th>
                <th className="border px-4 py-2 text-left font-bold">Source</th>
                <th className="border px-4 py-2 text-left font-bold">Year</th>
                <th className="border px-4 py-2 text-left font-bold">DOI</th>
                <th className="border px-4 py-2 text-left font-bold">Claim</th>
                <th className="border px-4 py-2 text-left font-bold">
                  Evidence
                </th>
                <th className="border px-4 py-2 text-left font-bold">Average Rating</th>
                <th className="border px-4 py-2 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Render the article rows based on search results */}
              {articles.length > 0 ? (
  articles.map((article) => {
    const averageRating = article.rating.length > 0
      ? (article.rating.reduce((acc, curr) => acc + curr, 0) / article.rating.length).toFixed(1)
      : "No ratings";
    return (
      <tr key={article._id}>
        <td className="border px-4 py-2">
          <Link href={`/pages/analyse/${article._id}`} className="text-blue-600 hover:underline">
            {article.title}
          </Link>
        </td>
        <td className="border px-4 py-2">{article.authors.join(", ")}</td>
        <td className="border px-4 py-2">{article.source}</td>
        <td className="border px-4 py-2">{article.publicationYear}</td>
        <td className="border px-4 py-2">{article.doi}</td>
        <td className="border px-4 py-2">{article.claim || "N/A"}</td>
        <td className="border px-4 py-2">{article.evidence || "N/A"}</td>
        <td className="border px-4 py-2">{averageRating}/5</td>
        <td className="border px-4 py-2">{article.status || "N/A"}</td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan={9} className="text-center">No articles found.</td>
  </tr>
)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseAnalyze;
