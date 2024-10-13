'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';

// !! should use same article interface across pages?
interface Article {
  _id: string;
  title: string;
  authors: string;
  source: string;
  publicationYear: string;
  doi: string;
  rating: number;
  status: string;
}

const ModerateArticlePage = () => {
  
  const router = useRouter();
  const { id } = useParams(); // Get the article ID from the URL
  const [displayedArticle, setDisplayedArticle] = useState<Article | null>(null); // Store the first article
  const [loadingArticle, setLoadingArticle] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  
	const articleId = Array.isArray(id) ? id[0] : id; // Ensure `articleId` is a string


 	// Fetch the article based on the ID from the URL
	useEffect(() => {
		if (articleId) {
			fetchArticle(articleId);
		}
	}, [articleId]); // eslint-disable-line react-hooks/exhaustive-deps


  // Fetch a specific article by ID
  const fetchArticle = async (id: string) => {
    try {
      setLoadingArticle(true);
      const response = await fetch(`http://localhost:8082/articles/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const articleData: Article = await response.json(); 
      if (articleData && articleData.status === 'Unmoderated') {
        setDisplayedArticle(articleData); // Store the article
      } else {
				alert('This article is not available for moderation.');
				router.push('/pages/moderate'); // Redirect if not unmoderated
      }
    } catch (error) {
      console.error('Failed to fetch article:', error);
    } finally {
      setLoadingArticle(false);
    }
  };

  // Modify article state to 'Moderated'
  const onSubmit = async () => {
    setLoadingSubmit(true);
    try {
      const response = await fetch(`http://localhost:8082/articles/${displayedArticle!._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...displayedArticle,
          status: 'Moderated', // Update the status
        }),
      });

      if (response.ok) {
        console.log('Article updated successfully');
        router.push('/pages/moderate'); // Redirect after successful moderation
      } else {
        console.error('Failed to update article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Modify article state to 'Rejected'
  const onReject = async () => {
    setLoadingSubmit(true);
    try {
      const response = await fetch(`http://localhost:8082/articles/${displayedArticle!._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...displayedArticle,
          status: 'Rejected', // Update the status
        }),
      });

      if (response.ok) {
        console.log('Article updated successfully');
        router.push('/'); // Redirect after rejection
      } else {
        console.error('Failed to update article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingArticle) {
    return <p>Loading...</p>; // Show loading state while fetching
  }

  if (!displayedArticle) {
    return <p>No article found.</p>; // Show message if no article is found
  }

  return (
    <div className="min-h-screen mt-16 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Moderation Page</h1>
        <div>
          
          <p className="mb-2"><strong>Title:</strong> {displayedArticle.title}</p>
          <p className="mb-2"><strong>Authors:</strong> {displayedArticle.authors}</p>
          <p className="mb-2"><strong>Source:</strong> {displayedArticle.source}, {displayedArticle.publicationYear}</p>
          <p className="mb-2">
            <strong>DOI:</strong>
            <a href={displayedArticle.doi} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{displayedArticle.doi}</a>
          </p>
          <p className="mb-2"><strong>Article ID:</strong> {displayedArticle._id}</p>
        </div>
  
        <div className="flex mt-4 space-x-4">
          <button 
            onClick={onReject}
            className={`px-4 py-2 font-semibold rounded ${
              loadingSubmit
                ? 'bg-red-300 text-red-700 cursor-not-allowed'  // Disabled styles
                : 'bg-red-500 text-white hover:bg-red-700'      // Active styles
            }`}
            disabled={loadingSubmit}
          >
            Reject
          </button>
          <button 
            onClick={onSubmit}
            className={`px-4 py-2 font-semibold rounded ${
              loadingSubmit
                ? 'bg-blue-300 text-blue-700 cursor-not-allowed'  // Disabled styles
                : 'bg-blue-500 text-white hover:bg-blue-700'      // Active styles
            }`}
            disabled={loadingSubmit}
          >
            Submit for Analysis
          </button>
        </div>
      </div>
    </div>
  );
  

};

export default ModerateArticlePage;