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
  
}

const ArticleAdminPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [newRating, setNewRating] = useState<number>(0);
  const [editableTitle, setEditableTitle] = useState('');
  const [editableAuthors, setEditableAuthors] = useState('');
  const [editableSource, setEditableSource] = useState('');
  const [editableYear, setEditableYear] = useState('');
  const [editableDOI, setEditableDOI] = useState('');
  const [editableClaim, setEditableClaim] = useState('');
  const [editableEvidence, setEditableEvidence] = useState('');
  const [editableStatus, setEditableStatus] = useState('');


  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8082/articles/${id}`);
        const data = await response.json();
        setArticle(data);
        setEditableTitle(data.title);
        setEditableAuthors(data.authors.join(', ')); 
        setEditableSource(data.source);
        setEditableYear(data.publicationYear);
        setEditableDOI(data.doi);
        setEditableClaim(data.claim.join(', '));
        setEditableEvidence(data.evidence.join(', '));
        setEditableStatus(data.status);
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

  const handleAuthorsChange = (e) => setEditableAuthors(e.target.value);
  const handleSourceChange = (e) => setEditableSource(e.target.value);
  const handleYearChange = (e) => setEditableYear(e.target.value);
  const handleDOIChange = (e) => setEditableDOI(e.target.value);
  const handleClaimChange = (e) => setEditableClaim(e.target.value);
  const handleEvidenceChange = (e) => setEditableEvidence(e.target.value);
  const handleStatusChange = (e) => setEditableStatus(e.target.value);

  

  

 

  const updateArticleDetails = async () => {
    const articleData = {
      title: editableTitle,
      authors: editableAuthors.split(',').map(author => author.trim()), // Split string back into array
      source: editableSource,
      publicationYear: editableYear,
      doi: editableDOI,
      claim: editableClaim.split(',').map(claim => claim.trim()),
      evidence: editableEvidence.split(',').map(evidence => evidence.trim()),
      status: editableStatus,
    };
  
    try {
      const response = await fetch(`http://localhost:8082/articles/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
      if (response.ok) {
        const updatedArticle = await response.json();
        setArticle(updatedArticle);
        alert('Article updated successfully!');
      } else {
        console.error('Failed to update article');
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className="min-h-screen mt-16 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Administrator Override</h1>
        <h2 className="text-1xl font-bold mb-4">Modify Article</h2>
  
        <div className="mb-4">
          <label htmlFor="title" className="font-medium">Title:</label>
          <input
            type="text"
            id="title"
            value={editableTitle}
            onChange={handleTitleChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="authors" className="font-medium">Authors:</label>
          <input
            type="text"
            id="authors"
            value={editableAuthors}
            onChange={handleAuthorsChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="source" className="font-medium">Source:</label>
          <input
            type="text"
            id="source"
            value={editableSource}
            onChange={handleSourceChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="year" className="font-medium">Publication Year:</label>
          <input
            type="text"
            id="year"
            value={editableYear}
            onChange={handleYearChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="doi" className="font-medium">DOI:</label>
          <input
            type="text"
            id="doi"
            value={editableDOI}
            onChange={handleDOIChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="claim" className="font-medium">Claim (multiple claims separated by comma):</label>
          <textarea
            id="claim"
            value={editableClaim}
            onChange={handleClaimChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
            rows="3"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="evidence" className="font-medium">Evidence:</label>
          <textarea
            id="evidence"
            value={editableEvidence}
            onChange={handleEvidenceChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
            rows="3"
          />
        </div>
  
        <div className="mb-4">
  <label htmlFor="status" className="font-medium">Status:</label>
  <select
    id="status"
    value={editableStatus}
    onChange={handleStatusChange}
    className="block w-full p-2 border border-gray-300 rounded mt-1"
  >
    <option value="Unmoderated">Unmoderated</option>
    <option value="Moderated">Moderated</option>
    <option value="Analyzed">Analyzed</option>
  </select>
</div>

  
        <button
          onClick={updateArticleDetails}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
  
};

export default ArticleAdminPage;
