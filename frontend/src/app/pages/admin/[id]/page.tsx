"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, SetStateAction } from "react";

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  publicationYear: string;
  doi: string;
  rating: number[];
  status: string;
  journalConferenceName: string;
  sePractice: string;
  evidenceResult: string;
  researchType: string;
  participantType: string;
}


const ArticleAdminPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [editableTitle, setEditableTitle] = useState('');
  const [editableAuthors, setEditableAuthors] = useState('');
  const [editableSource, setEditableSource] = useState('');
  const [editableYear, setEditableYear] = useState('');
  const [editableDOI, setEditableDOI] = useState('');
  const [editableClaim, setEditableClaim] = useState('');
  const [editableEvidence, setEditableEvidence] = useState('');
  const [editableStatus, setEditableStatus] = useState('');

  const [editableJournalConferenceName, setEditableJournalConferenceName] = useState('');
  const [editableSEPractice, setEditableSEPractice] = useState('');
  const [editableEvidenceResult, setEditableEvidenceResult] = useState('');
  const [editableResearchType, setEditableResearchType] = useState('');
  const [editableParticipantType, setEditableParticipantType] = useState('');



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

        setEditableJournalConferenceName(data.journalConferenceName);
  setEditableSEPractice(data.sePractice);
  setEditableEvidenceResult(data.evidenceResult);
  setEditableResearchType(data.researchType);
  setEditableParticipantType(data.participantType);
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

  const handleAuthorsChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableAuthors(e.target.value);
  const handleSourceChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableSource(e.target.value);
  const handleYearChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableYear(e.target.value);
  const handleDOIChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableDOI(e.target.value);
  const handleClaimChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableClaim(e.target.value);
  const handleEvidenceChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableEvidence(e.target.value);
  const handleStatusChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableStatus(e.target.value);

  const handleJournalConferenceNameChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableJournalConferenceName(e.target.value);
const handleSEPracticeChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableSEPractice(e.target.value);
const handleEvidenceResultChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableEvidenceResult(e.target.value);
const handleResearchTypeChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableResearchType(e.target.value);
const handleParticipantTypeChange = (e: { target: { value: SetStateAction<string>; }; }) => setEditableParticipantType(e.target.value);


  

  

 

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
            rows={3}
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="evidence" className="font-medium">Evidence:</label>
          <textarea
            id="evidence"
            value={editableEvidence}
            onChange={handleEvidenceChange}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
            rows={3}
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

<div className="mb-4">
  <label htmlFor="journalConferenceName" className="font-medium">Journal/Conference Name:</label>
  <input
    type="text"
    id="journalConferenceName"
    value={editableJournalConferenceName}
    onChange={handleJournalConferenceNameChange}
    className="block w-full p-2 border border-gray-300 rounded mt-1"
  />
</div>

<div className="mb-4">
  <label htmlFor="sePractice" className="font-medium">SE Practice:</label>
  <input
    type="text"
    id="sePractice"
    value={editableSEPractice}
    onChange={handleSEPracticeChange}
    className="block w-full p-2 border border-gray-300 rounded mt-1"
  />
</div>

<div className="mb-4">
  <label htmlFor="evidenceResult" className="font-medium">Evidence Result:</label>
  <input
    type="text"
    id="evidenceResult"
    value={editableEvidenceResult}
    onChange={handleEvidenceResultChange}
    className="block w-full p-2 border border-gray-300 rounded mt-1"
  />
</div>

<div className="mb-4">
  <label htmlFor="researchType" className="font-medium">Research Type:</label>
  <input
    type="text"
    id="researchType"
    value={editableResearchType}
    onChange={handleResearchTypeChange}
    className="block w-full p-2 border border-gray-300 rounded mt-1"
  />
</div>

<div className="mb-4">
  <label htmlFor="participantType" className="font-medium">Participant Type:</label>
  <input
    type="text"
    id="participantType"
    value={editableParticipantType}
    onChange={handleParticipantTypeChange}
    className="block w-full p-2 border border-gray-300 rounded mt-1"
  />
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
