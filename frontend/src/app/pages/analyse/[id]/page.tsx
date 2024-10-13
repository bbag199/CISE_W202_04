"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Article {
  _id: string;
  title: string;
  authors: string;
  source: string;
  publicationYear: string;
  doi: string;
  rating: number;
  status: string;
  //claim and evidence
  claim: string[];
  evidence: string[];
}

const AnalyzePage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the article ID from the URL
  const [displayedArticle, setDisplayedArticle] = useState<Article | null>(
    null
  ); // Store the first article
  const [loadingArticle, setLoadingArticle] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  //state for claim and evidence
  const [claim, setClaim] = useState<string[]>([]);
  const [evidence, setEvidence] = useState<string[]>([]);

  const articleId = Array.isArray(id) ? id[0] : id;

  // useEffect(() => {
  // 	if (articleId) {
  // 		fetchArticle(articleId);
  // 	}
  // }, [articleId]);

  useEffect(() => {
    fetchArticle(articleId);
  }, [articleId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchArticle = async (id: string) => {
    try {
      setLoadingArticle(true);
      const response = await fetch(`http://localhost:8082/articles/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const articleData: Article = await response.json();
      if (articleData && articleData.status === "Moderated") {
        setDisplayedArticle(articleData);
        //pre-fill claim and evidence
        setClaim(articleData.claim || ["N/A"]);
        setEvidence(articleData.evidence || ["N/A"]);
      } else {
        console.log(articleData);
        console.log(articleData.status);
        alert("This article is not available for analyse");
        router.push("/pages/analyse");
      }
    } catch (error) {
      console.error("Failed to fetch article: ", error);
    } finally {
      setLoadingArticle(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingSubmit(true);
    
    try {

      const concatClaim = claim.join(', ');
      const concatEvidence = evidence.join(', ');

      const response = await fetch(
        `http://localhost:8082/articles/${displayedArticle!._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...displayedArticle,
            status: "Analyzed",
            claim: concatClaim,
            evidence: concatEvidence,
          }),
        }
      );

      if (response.ok) {
        console.log("Article updated successfully");
        router.push("/pages/analyse");
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating article: ", error);
    } finally {
      setLoadingSubmit(false);
    }
  };
  //
  const handleClaimChange = (index: number, newValue: string) => {
    const newClaim = [...claim];
    newClaim[index] = newValue;
    setClaim(newClaim);
  };
  //
  const addClaimField = () => {
    setClaim([...claim, ""]);
  };

  const removeClaimField = (index: number) => {
    if (claim.length > 1) {
      const newClaims = [...claim];
      newClaims.splice(index, 1);
      setClaim(newClaims);
    }
  };

  const handleEvidenceChange = (index: number, value: string) => {
    const newEvidence = [...evidence];
    newEvidence[index] = value;
    setEvidence(newEvidence);
  };

  const addEvidenceField = () => {
    setEvidence([...evidence, ""]);
  };

  const removeEvidenceField = (index: number) => {
    if (evidence.length > 1) {
    const newEvidence = evidence.filter((_, i) => i !== index);
    setEvidence(newEvidence);
    }
  }

  if (loadingArticle) {
    return <p>Loading...</p>;
  }

  if (!displayedArticle) {
    return <p>No article found.</p>; // Show message if no article is found
  }

  return (
    <div className="min-h-screen mt-16 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 bg-white">
       
        <h1 className="text-2xl font-bold mb-4">Analysis Page</h1>
  
        <div>
          
          <p className="mb-2"><strong>Title:</strong> {displayedArticle.title}</p>
          <p className="mb-2"><strong>Authors:</strong> {displayedArticle.authors}</p>
          <p className="mb-2"><strong>Source:</strong> {displayedArticle.source}, {displayedArticle.publicationYear}</p>
          <p className="mb-2">
            <strong>DOI: </strong>
            <a href={displayedArticle.doi} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{displayedArticle.doi}</a>
          </p>
          <p className="mb-2"><strong>Article ID:</strong> {displayedArticle._id}</p>
        </div>
  
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Claim</label>
            {claim.map((claimValue, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  value={claimValue}
                  onChange={(e) => handleClaimChange(index, e.target.value)}
                  placeholder="Enter claim"
                  className="border p-2 rounded w-full bg-gray-100"
                  required
                />
                {claim.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClaimField(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-700"
                  >
                    Remove Claim
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addClaimField}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Claim
            </button>
          </div>
  
          <div className="mb-6">
            <label className="block mb-2 font-medium">Evidence</label>
            {evidence.map((evidenceValue, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  value={evidenceValue}
                  onChange={(e) => handleEvidenceChange(index, e.target.value)}
                  placeholder="Enter evidence"
                  className="border p-2 rounded w-full bg-gray-100"
                  required
                />
                {evidence.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEvidenceField(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-700"
                  >
                    Remove Evidence
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEvidenceField}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Evidence
            </button>   
          </div>
  
          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              value="submit"
              className={`px-4 py-2 font-semibold rounded ${
                loadingSubmit
                  ? "bg-blue-300 text-blue-700 cursor-not-allowed" // Disabled styles
                  : "bg-blue-500 text-white hover:bg-blue-700" // Active styles
              }`}
              disabled={loadingSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default AnalyzePage;
