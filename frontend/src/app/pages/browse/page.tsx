'use client'; // Mark this component as a client component

import React, { useState, useEffect } from 'react';
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  publicationYear: string;
  doi: string;
  claim: string;
  evidence: string;
  rating: number;
}

const BrowsePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm === '') {
      fetchArticles();
    } else {
      const delayDebounceFn = setTimeout(() => {
        searchArticles(searchTerm);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8082/articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchArticles = async (title: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8082/articles/search?title=${title}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen mt-16">
      <div className="flex justify-center items-center space-x-4 xl:w-3/4 mx-auto">
        <span className="font-bold text-xl flex-shrink-0 whitespace-nowrap">
          Browse articles
        </span>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full md:w-2/3 lg:w-1/2 xl:w-3/4 rounded-full border border-solid border-neutral-300 bg-white px-6 py-3 text-base font-normal leading-6 text-neutral-700 outline-none shadow-md transition duration-200 ease-in-out focus:z-[3] focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus:border-blue-500"
          placeholder="Search for an article by title..."
          aria-label="Search"
        />
      </div>

      <div className="mt-16">
        {isLoading ? (
          <div className="text-center">Loading articles...</div>
        ) : (
          <div className="px-4 md:px-8">
            <table className="min-w-full table-auto border border-blue-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left font-bold">Title</th>
                  <th className="border px-4 py-2 text-left font-bold">Authors</th>
                  <th className="border px-4 py-2 text-left font-bold">Source</th>
                  <th className="border px-4 py-2 text-left font-bold">Year</th>
                  <th className="border px-4 py-2 text-left font-bold">DOI</th>
                  <th className="border px-4 py-2 text-left font-bold">Claim</th>
                  <th className="border px-4 py-2 text-left font-bold">Evidence</th>
                  <th className="border px-4 py-2 text-left font-bold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <tr key={article._id}>
                      <td className="border px-4 py-2">
                        <Link
                        href={`/pages/browse/${article._id}`}
                        className="text-blue-600 hover:underline"
                        >
                        {article.title}
                        </Link>
                      </td>
                      <td className="border px-4 py-2">{article.authors.join(', ')}</td>
                      <td className="border px-4 py-2">{article.source}</td>
                      <td className="border px-4 py-2">{article.publicationYear}</td>
                      <td className="border px-4 py-2">{article.doi}</td>
                      <td className="border px-4 py-2">{article.claim || 'N/A'}</td>
                      <td className="border px-4 py-2">{article.evidence || 'N/A'}</td>
                      <td className="border px-4 py-2">{article.rating}/5</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">No articles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
