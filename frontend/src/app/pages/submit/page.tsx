'use client'; // Mark this component as a client component

import React, { ChangeEvent, FormEvent, useState } from 'react';

interface Article {
  title: string;
  authors: string[];
  source: string;
  publicationYear: string;
  doi: string;
  rating: number;
}

const DefaultEmptyArticle: Article = {
  title: '',
  authors: [''],  
  source: '',
  publicationYear: '',
  doi: '',
  rating: 0,
};


const SubmitArticlePage = () => {
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAuthorChange = (index: number, newValue: string) => {
    const newAuthors = [...article.authors];
    newAuthors[index] = newValue;
    setArticle({ ...article, authors: newAuthors });
  };
  
  const handleAddAuthor = () => {
    setArticle({ ...article, authors: [...article.authors, ''] });
  };
  
  const handleRemoveAuthor = (index: number) => {
    const newAuthors = article.authors.filter((_, i) => i !== index);
    setArticle({ ...article, authors: newAuthors });
  };

  
  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });

    
    
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   
    const authorsArray = article.authors.map((author) => author.trim());

    const articleToSubmit = {
      ...article,
      authors: authorsArray,
      rating: Number(article.rating),
    };

    try {
      const response = await fetch('http://localhost:8082/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleToSubmit),
      });

      if (response.ok) {
        console.log('Article submitted successfully');
        setArticle(DefaultEmptyArticle); // Clear the form
        setSuccessMessage('Article submitted successfully!'); // Set success message
      } else {
        console.error('Failed to submit article');
      }
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  return (

      <div className="flex justify-center items-center h-screen">
        <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-lg w-3/4 max-w-4xl">
          <h1 className="text-xl font-bold mb-4">Article Submission</h1>
    
          <label htmlFor="title" className="block mb-2">Title:</label>
          <input type="text" id="title" name="title" value={article.title} onChange={onChange} required className="mb-4 p-2 w-full bg-gray-100"/>
    
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
              <button type="button" onClick={() => handleRemoveAuthor(index)} className="ml-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddAuthor} className="mt-2 mb-4 bg-green-500 hover:bg-green-700 text-white p-2 rounded">
          Add Author
        </button>
      </div>
          <label htmlFor="source" className="block mb-2">Source:</label>
          <input type="text" id="source" name="source" value={article.source} onChange={onChange} required className="mb-4 p-2 w-full bg-gray-100"/>
    
          <label htmlFor="publicationYear" className="block mb-2">Publication Year:</label>
          <input type="text" id="publicationYear" name="publicationYear" value={article.publicationYear} onChange={onChange} required className="mb-4 p-2 w-full bg-gray-100"/>
    
          <label htmlFor="doi" className="block mb-2">DOI:</label>
          <input type="text" id="doi" name="doi" value={article.doi} onChange={onChange} required className="mb-4 p-2 w-full bg-gray-100"/>
    
          <label htmlFor="rating" className="block mb-2">Rating:</label>
          <select id="rating" name="rating" value={article.rating} onChange={onChange} required className="mb-4 p-2 w-full bg-gray-100">
            <option value="0" disabled>Select a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
    
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit Article</button>
        </form>
      </div>
    
    
  );
};

export default SubmitArticlePage;
