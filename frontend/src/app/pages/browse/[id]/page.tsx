"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  publicationYear: string;
  doi: string;
  claim: string[];
  evidence: string[];
  rating: number[];
  status: string;
  journalConferenceName: string;
  sePractice: string;
  evidenceResult: string;
  researchType: string;
  participantType: string;
}

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [newRating, setNewRating] = useState<number>(0);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const averageRating = article && article.rating.length > 0
    ? (article.rating.reduce((acc, curr) => acc + curr, 0) / article.rating.length).toFixed(1)
    : "No ratings yet";

  return (
    <div className="min-h-screen mt-16 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Title: {article.title}</h1>
        <p className="mb-2"><strong>Authors:</strong> {article.authors.join(", ")}</p>
        <p className="mb-2"><strong>Source:</strong> {article.source}</p>
        <p className="mb-2"><strong>Publication Year:</strong> {article.publicationYear}</p>
        <p className="mb-2"><strong>DOI:</strong> {article.doi}</p>
        <p className="mb-2"><strong>Claim:</strong> {article.claim.length > 0 ? article.claim.join(", ") : "N/A"}</p>
        <p className="mb-2"><strong>Evidence:</strong> {article.evidence.length > 0 ? article.evidence.join(", ") : "N/A"}</p>
        <p className="mb-2"><strong>Average Rating:</strong> {averageRating}/5</p>
        <p className="mb-2"><strong>Status:</strong> {article.status || "N/A"}</p>
        <p className="mb-2"><strong>Journal/Conference Name:</strong> {article.journalConferenceName}</p>
        <p className="mb-2"><strong>SE Practice:</strong> {article.sePractice}</p>
        <p className="mb-2"><strong>Evidence Result:</strong> {article.evidenceResult}</p>
        <p className="mb-2"><strong>Research Type:</strong> {article.researchType}</p>
        <p className="mb-2"><strong>Participant Type:</strong> {article.participantType}</p>

        <div className="mt-4">
          <label htmlFor="rating" className="block mb-2 font-medium">Add Rating:</label>
          <select
            id="rating"
            name="rating"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            required
            className="mb-4 p-2 w-full bg-gray-200 border border-gray-300 rounded"
          >
            <option value="0" disabled>Select a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button
            type="button"
            onClick={async () => {
              try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}/rate`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ rating: newRating }),
                });
                if (response.ok) {
                  const updatedArticle = await response.json();
                  setArticle(updatedArticle);
                  alert('Rating added successfully!');
                } else {
                  console.error('Failed to add rating');
                }
              } catch (error) {
                console.error("Error submitting rating:", error);
              }
            }}
            className="inline-block bg-green-500 hover:bg-green-700 text-white font-medium p-2 rounded"
          >
            Rate Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
