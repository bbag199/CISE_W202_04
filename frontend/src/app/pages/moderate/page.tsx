'use client';

import React, { useState } from "react";
import { Article } from "@shared/types"


const ModeratePage = () => {
  
  const [loadingArticle, setLoadingArticle] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const scriptOne = () => {
    setLoadingSubmit(true);

    console.log("Script One is running");
    // Add your script logic here

    setLoadingSubmit(false);
  };

  const scriptTwo = () => {
    setLoadingSubmit(true);

    console.log("Script Two is running");
    // Add your script logic here

    setLoadingSubmit(false);
  };

  const article : Article = {
    _id: "1",
    title: "An experimental evaluation of test driven development vs. test-last development with industry professionals",
    authors: "Munir, H., Wnuk, K., Petersen, K., Moayyed, M.",
    source: "EASE",
    publicationYear: "2014",
    doi: "https://doi.org/10.1145/2601248.2601267",
    rating: 0,
    claim: "",
    evidence: "",
    status: "unmoderated"
  }
  
  return (
    <>
      <p>Moderation Page</p>

      <br />

      <div>
        <h1>{article.title}</h1>
        <h3>{article.authors}</h3>
        <h3>{article.source}, {article.publicationYear}</h3>
        <h3>
          <a href={article.doi} target="_blank" rel="noopener noreferrer">{article.doi}</a>
        </h3>
      </div>

      <br />

      <div className="flex space-x-4">
        <button 
          onClick={scriptOne}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          disabled={loadingSubmit}
        >
          Reject
        </button>
        <button 
          onClick={scriptTwo}
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