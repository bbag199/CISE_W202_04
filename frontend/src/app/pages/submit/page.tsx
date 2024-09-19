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
        setArticle(DefaultEmptyArticle); // Reset form
        router.push('/'); // Navigate to homepage or another page after submission
      } else {
        console.error('Failed to submit article');
      }
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  return (
    <div>
      <h1>Submit a New Article</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="authors">Authors (comma-separated):</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={article.authors}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="source">Source:</label>
          <input
            type="text"
            id="source"
            name="source"
            value={article.source}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="publicationYear">Publication Year:</label>
          <input
            type="text"
            id="publicationYear"
            name="publicationYear"
            value={article.publicationYear}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="doi">DOI:</label>
          <input
            type="text"
            id="doi"
            name="doi"
            value={article.doi}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label htmlFor="rating">Rating (1-5):</label>
          <select
            id="rating"
            name="rating"
            value={article.rating}
            onChange={onChange}
            required
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
        </div>

        <button type="submit">Submit Article</button>
      </form>
    </div>
  );
};

export default SubmitArticlePage;
