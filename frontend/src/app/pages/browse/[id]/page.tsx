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
  claim: string;
  evidence: string;
  rating: number[];
  status: string;
  
}

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [newRating, setNewRating] = useState<number>(0);


  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8082/articles/${id}`);
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

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen mt-16">
      <h1><strong>Title: </strong>{article.title}</h1>
      <p>
        <strong>Authors: </strong> {article.authors.join(", ")}
      </p>
      <p>
        <strong>Source: </strong> {article.source}
      </p>
      <p>
        <strong>Publication Year: </strong> {article.publicationYear}
      </p>
      <p>
        <strong>DOI: </strong> {article.doi}
      </p>
      <p>
        <strong>Claim: </strong> {article.claim || "N/A"}
      </p>
      <p>
        <strong>Evidence: </strong> {article.evidence || "N/A"}
      </p>

      <p>
        <strong>Average Rating: </strong> {averageRating}/5
      </p>


      <p>
        <strong>Status: </strong> {article.status || "N/A"}
      </p>
      <p>
        <strong>Add Rating: </strong>
      </p>

      <select
  id="rating"
  name="rating"
  value={newRating}
  onChange={(e) => setNewRating(Number(e.target.value))}
  required
  className="mb-4 p-2 w-full bg-gray-100"
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
      const response = await fetch(`http://localhost:8082/articles/${id}/rate`, {
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
  className="bg-green-500 hover:bg-green-700 text-white p-2 rounded"
>
  Rate Article
</button>

    </div>
  );
};

export default ArticleDetailsPage;
