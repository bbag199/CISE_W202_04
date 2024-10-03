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

const ArticleAdminPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [newRating, setNewRating] = useState<number>(0);
  const [editableTitle, setEditableTitle] = useState('');


  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8082/articles/${id}`);
        const data = await response.json();
        setArticle(data);
        setEditableTitle(data.title);
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(event.target.value);
  };

  const updateArticleTitle = async () => {
    try {
      const response = await fetch(`http://localhost:8082/articles/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editableTitle }),
      });
      if (response.ok) {
        const updatedArticle = await response.json();
        setArticle(updatedArticle);
        alert('Title updated successfully!');
      } else {
        console.error('Failed to update title');
      }
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const averageRating = article && article.rating.length > 0
    ? (article.rating.reduce((acc, curr) => acc + curr, 0) / article.rating.length).toFixed(1)
    : "No ratings yet";

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen mt-16 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Title: {article.title}</h1>
        <p className="mb-2"><strong>Authors:</strong> {article.authors.join(", ")}</p>
        <p className="mb-2"><strong>Source:</strong> {article.source}</p>
        <p className="mb-2"><strong>Publication Year:</strong> {article.publicationYear}</p>
        <p className="mb-2"><strong>DOI:</strong> {article.doi}</p>
        <p className="mb-2"><strong>Claim:</strong> {article.claim || "N/A"}</p>
        <p className="mb-2"><strong>Evidence:</strong> {article.evidence || "N/A"}</p>
        <p className="mb-2"><strong>Average Rating:</strong> {averageRating}/5</p>
        <p className="mb-2"><strong>Status:</strong> {article.status || "N/A"}</p>
        
        <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
        <div className="mb-2">
          <label htmlFor="title" className="font-medium">Title:</label>
          <input
            type="text"
            id="title"
            value={editableTitle}
            onChange={handleTitleChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          onClick={updateArticleTitle}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>


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
            className="inline-block bg-green-500 hover:bg-green-700 text-white font-medium p-2 rounded"
          >
            Rate Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleAdminPage;
