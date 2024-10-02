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
  rating: number;
  status: string;
}

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

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

  return (
    <div className="min-h-screen mt-16">
      <h1>{article.title}</h1>
      <p>
        <strong>Authors:</strong> {article.authors.join(", ")}
      </p>
      <p>
        <strong>Source:</strong> {article.source}
      </p>
      <p>
        <strong>Publication Year:</strong> {article.publicationYear}
      </p>
      <p>
        <strong>DOI:</strong> {article.doi}
      </p>
      <p>
        <strong>Claim:</strong> {article.claim || "N/A"}
      </p>
      <p>
        <strong>Evidence:</strong> {article.evidence || "N/A"}
      </p>
      <p>
        <strong>Rating:</strong> {article.rating}/5
      </p>
      <p>
        <strong>Status:</strong> {article.status || "N/A"}
      </p>
    </div>
  );
};

export default ArticleDetailsPage;
