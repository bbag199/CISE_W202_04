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
  evidence: string;
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
  const [claim, setClaim] = useState<string[]>([""]);
  const [evidence, setEvidence] = useState<string>("");

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
        setClaim(articleData.claim || [""]);
        setEvidence(articleData.evidence || "");
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
            claim: claim,
            evidence: evidence,
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
  const handleClaimChange = (index: number, value: string) => {
    const newClaim = [...claim];
    newClaim[index] = value;
    setClaim(newClaim);
  };
  //
  const addClaimField = () => {
    setClaim([...claim, ""]);
  };

  const removeClaimField = (index: number) => {
    const newClaims = claim.filter((_, i) => i !== index);
    setClaim(newClaims);
  };

  if (loadingArticle) {
    return <p>Loading...</p>;
  }

  if (!displayedArticle) {
    return <p>No article found.</p>; // Show message if no article is found
  }

  return (
    <>
      <p>Analysis Page</p>

      <br />

      <div>
        <h1>{displayedArticle.title}</h1>
        <h3>{displayedArticle.authors}</h3>
        <h3>
          {displayedArticle.source}, {displayedArticle.publicationYear}
        </h3>
        <h3>
          <a
            href={displayedArticle.doi}
            target="_blank"
            rel="noopener noreferrer"
          >
            {displayedArticle.doi}
          </a>
        </h3>
        <h4>Article ID: {displayedArticle._id}</h4>
      </div>

      <br />

      <form onSubmit={onSubmit}>
        {/*Text fields from claims and evd */}
        <div>
          <label>Claim</label>
          {claim.map((claim, index) => (
            <div key={index} className="mb-2">
              <textarea
                value={claim}
                onChange={(e) => handleClaimChange(index, e.target.value)}
                placeholder="Enter claim"
                className="border p-2 rounded w-full"
                required
              />
              <button
                type="button"
                onClick={() => removeClaimField(index)}
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              >
                Remove Claim
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addClaimField}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Claim
          </button>
        </div>

        <div>
          <label>Evidence</label>
          <textarea
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder="Evidence"
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            value="submit"
            className={`px-4 py-2 font-semibold rounded ${
              loadingSubmit
                ? "bg-blue-300 text-blue-700 cursor-not-allowed" // Disabled styles
                : "bg-blue-500 text-white hover:bg-blue-600" // Active styles
            }`}
            disabled={loadingSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AnalyzePage;
