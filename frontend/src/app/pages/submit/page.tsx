"use client"; // Mark this component as a client component

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRequireAuth } from "../../../hooks/useRequireAuth";

interface Article {
  title: string;
  authors: string[];
  source: string;
  publicationYear: string;
  doi: string;
  rating: number[];
  journalConferenceName: string;
  sePractice: string;
  evidenceResult: string;
  researchType: string;
  participantType: string;
}

const DefaultEmptyArticle: Article = {
  title: "",
  authors: [""],
  source: "",
  publicationYear: "",
  doi: "",
  rating: [],
  journalConferenceName: "",
  sePractice: "",
  evidenceResult: "",
  researchType: "",
  participantType: "",
};


const SubmitArticlePage = () => {
  useRequireAuth();

  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState<number | null>(null);  // To hold the current selection

  
  const handleAuthorChange = (index: number, newValue: string) => {
    const newAuthors = [...article.authors];
    newAuthors[index] = newValue;
    setArticle({ ...article, authors: newAuthors });
  };

  

  const handleAddAuthor = () => {
    setArticle({ ...article, authors: [...article.authors, ""] });
  };

  const handleRemoveAuthor = (index: number) => {
    const newAuthors = article.authors.filter((_, i) => i !== index);
    setArticle({ ...article, authors: newAuthors });
  };

  // const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = event.target;
  //   setArticle({ ...article, [name]: value });
  // };

 
  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'rating') {
      setCurrentRating(Number(value));  // Set current rating
    } else {
      setArticle({ ...article, [name]: value });
    }
  };

 
  



  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authorsArray = article.authors.map((author) => author.trim());
    const updatedRatings = currentRating ? [...article.rating, currentRating] : [...article.rating]; // Add the new rating to the existing array

    //const updatedRatings = currentRating ? [currentRating] : []; // Wrap current rating in an array if not null

    const articleToSubmit = {
      ...article,
      authors: authorsArray,
      rating: updatedRatings,  // Now it's an array of ratings
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleToSubmit),
      });

      if (response.ok) {
        console.log("Article submitted successfully");
        setArticle(DefaultEmptyArticle); // Clear the form
        setCurrentRating(null); 
        setSuccessMessage("Article submitted successfully!"); // Set success message
      } else {
        console.error("Failed to submit article");
      }
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center pt-5"> {/* Added padding-top to avoid overlap with navbar */}
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-4xl mx-auto" // Ensured it doesn't extend off the screen
      >
        <h1 className="text-xl font-bold mb-4">Article Submission</h1>

        {successMessage && (
          <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
            {successMessage}
          </div>
        )}

        <label htmlFor="title" className="block mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={article.title}
          onChange={onChange}
          required
          className="mb-4 p-2 w-full bg-gray-100"
        />

        <div>
          <label className="block mb-2">Author(s):</label>
          {article.authors.map((author, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={author}
                onChange={(e) => handleAuthorChange(index, e.target.value)}
                required
                className="p-2 w-full bg-gray-100"
              />
              {article.authors.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAuthor(index)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAuthor}
            className="mt-2 mb-4 bg-green-500 hover:bg-green-700 text-white p-2 rounded"
          >
            Add Author
          </button>
        </div>
        <label htmlFor="source" className="block mb-2">
          Source:
        </label>
        <input
          type="text"
          id="source"
          name="source"
          value={article.source}
          onChange={onChange}
          required
          className="mb-4 p-2 w-full bg-gray-100"
        />

        <label htmlFor="publicationYear" className="block mb-2">
          Publication Year:
        </label>
        <input
          type="text"
          id="publicationYear"
          name="publicationYear"
          value={article.publicationYear}
          onChange={onChange}
          required
          className="mb-4 p-2 w-full bg-gray-100"
        />

        <label htmlFor="doi" className="block mb-2">
          DOI:
        </label>
        <input
          type="text"
          id="doi"
          name="doi"
          value={article.doi}
          onChange={onChange}
          required
          className="mb-4 p-2 w-full bg-gray-100"
        />

        <label htmlFor="rating" className="block mb-2">
          Rating:
        </label>
        <select
          id="rating"
          name="rating"
          value={currentRating ?? '0'}
          onChange={onChange}
          required
          className="mb-4 p-2 w-full bg-gray-100"
        >
          <option value="0" disabled>
            Select a rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>



        <label htmlFor="journalConferenceName" className="block mb-2">
  Journal/Conference Name:
</label>
<input
  type="text"
  id="journalConferenceName"
  name="journalConferenceName"
  value={article.journalConferenceName}
  onChange={onChange}
  required
  className="mb-4 p-2 w-full bg-gray-100"
/>

<label htmlFor="sePractice" className="block mb-2">
  SE Practice:
</label>
<input
  type="text"
  id="sePractice"
  name="sePractice"
  value={article.sePractice}
  onChange={onChange}
  required
  className="mb-4 p-2 w-full bg-gray-100"
/>

<label htmlFor="evidenceResult" className="block mb-2">
  Evidence Result:
</label>
<input
  type="text"
  id="evidenceResult"
  name="evidenceResult"
  value={article.evidenceResult}
  onChange={onChange}
  required
  className="mb-4 p-2 w-full bg-gray-100"
/>

<label htmlFor="researchType" className="block mb-2">
  Research Type:
</label>
<input
  type="text"
  id="researchType"
  name="researchType"
  value={article.researchType}
  onChange={onChange}
  required
  className="mb-4 p-2 w-full bg-gray-100"
/>

<label htmlFor="participantType" className="block mb-2">
  Participant Type:
</label>
<input
  type="text"
  id="participantType"
  name="participantType"
  value={article.participantType}
  onChange={onChange}
  required
  className="mb-4 p-2 w-full bg-gray-100"
/>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default SubmitArticlePage;
