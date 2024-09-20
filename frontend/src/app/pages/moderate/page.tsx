'use client';

import React, { useState, useEffect } from "react";

// !! should use same article interface across pages?
interface Article {
  title: string;
  authors: string;
  source: string;
  publicationYear: string;
  doi: string;
  rating: number;
  status: string;
}

const ModeratePage = () => {
  
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [displayedArticle, setDisplayedArticle] = useState<Article | null>(null); // Store the first article
  const [loadingArticle, setLoadingArticle] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  

  useEffect(() => {
    setLoadingArticle(true);
    // Function to fetch a single unmoderated article
    const fetchArticles = async () => {
      try {
        const port = 8082; // !! should use port from .env
        // http://localhost:8082/articles/status/unmoderated
        const response = await fetch(`http://localhost:${port}/articles/status/unmoderated`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const articleData: Article[] = await response.json(); // Use the Article type for the data
        setArticles(articleData); // Store the article

        // Set displayedArticle to the first article if the array has at least one article
        if (articleData.length > 0) {
          setDisplayedArticle(articleData[0]);
        } else {
          setDisplayedArticle(null); // No articles to display
        }

      } catch (error) {
        console.error('Failed to fetch article:', error); 
      }  finally {
        setLoadingArticle(false);
      }
    };

    fetchArticles();
  }, []);

  const onReject = () => {
    setLoadingSubmit(true);

    console.log("Script One is running");
    // Add your script logic here

    setLoadingSubmit(false);
  };

  const onSubmit = async () => {
    setLoadingSubmit(true);

    console.log("Script Two is running");
    // Add your script logic here

    try {
      const response = await fetch('http://localhost:8082/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleToSubmit),
      });

      if (response.ok) {
        console.log('Article submitted successfully');
        setArticle(DefaultEmptyArticle); // Clear the form
        setSuccessMessage('Article submitted successfully!'); // Set success message
      } else {
        console.error('Failed to submit article');
      }
    } catch (error) {
      console.error('Error submitting article:', error);
    }

    setLoadingSubmit(false);
  };

  // const article : Article = {
  //   _id: "1",
  //   title: "An experimental evaluation of test driven development vs. test-last development with industry professionals",
  //   authors: "Munir, H., Wnuk, K., Petersen, K., Moayyed, M.",
  //   source: "EASE",
  //   publicationYear: "2014",
  //   doi: "https://doi.org/10.1145/2601248.2601267",
  //   rating: 0,
  //   claim: "",
  //   evidence: "",
  //   status: "unmoderated"
  // }
  
  if (loadingArticle) {
    return <p>Loading...</p>; // Show loading state while fetching
  }

  if (!articles || !displayedArticle) {
    return <p>No article found.</p>; // Show message if no article is found
  }



  return (
    <>
      <p>Moderation Page</p>

      <br />

      <div>
        <h1>{displayedArticle.title}</h1>
        <h3>{displayedArticle.authors}</h3>
        <h3>{displayedArticle.source}, {displayedArticle.publicationYear}</h3>
        <h3>
          <a href={displayedArticle.doi} target="_blank" rel="noopener noreferrer">{displayedArticle.doi}</a>
        </h3>
      </div>

      <br />

      <div className="flex space-x-4">
        <button 
          onClick={onReject}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          disabled={loadingSubmit}
        >
          Reject
        </button>
        <button 
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          disabled={loadingSubmit}
        >
          Submit for Analysis
        </button>
      </div>

    </>
  ) 

};

export default ModeratePage;