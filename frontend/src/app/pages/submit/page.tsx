'use client'; // Mark this component as a client component

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use this for client-side navigation

interface Article {
  title: string;
  authors: string;
  source: string;
  publicationYear: string;
  doi: string;
  rating: number;
}

const DefaultEmptyArticle: Article = {
  title: '',
  authors: '',
  source: '',
  publicationYear: '',
  doi: '',
  rating: 0,
};

const SubmitArticlePage = () => {
  const router = useRouter();
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   
    const authorsArray = article.authors.split(',').map((author) => author.trim());

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
        setArticle(DefaultEmptyArticle); 
        router.push('/'); 
      } else {
        console.error('Failed to submit article');
      }
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-lg">
        <h1 className="text-xl font-bold mb-4">Article Submission</h1>

        <label htmlFor="title" className="block mb-2">Title:</label>
        <input type="text" id="title" name="title" value={article.title} onChange={onChange} required className="mb-4 p-2 w-full"/>

        
        <label htmlFor="authors" className="block mb-2">Authors:</label>
        <input type="text" id="authors" name="authors" value={article.authors} onChange={onChange} required className="mb-4 p-2 w-full"/>



        <label htmlFor="source" className="block mb-2">Source:</label>
        <input type="text" id="source" name="source" value={article.source} onChange={onChange} required className="mb-4 p-2 w-full"/>

        <label htmlFor="publicationYear" className="block mb-2">Publication Year:</label>
        <input type="text" id="publicationYear" name="publicationYear" value={article.publicationYear} onChange={onChange} required className="mb-4 p-2 w-full"/>

        <label htmlFor="doi" className="block mb-2">DOI:</label>
        <input type="text" id="doi" name="doi" value={article.doi} onChange={onChange} required className="mb-4 p-2 w-full"/>

        <label htmlFor="rating" className="block mb-2">Rating:</label>
        <select id="rating" name="rating" value={article.rating} onChange={onChange} required className="mb-4 p-2 w-full">
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
