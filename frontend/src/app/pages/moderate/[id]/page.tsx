'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

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
  const { id } = router.query; // Get the article ID from the URL
  // const [articles, setArticles] = useState<Article[] | null>(null);
  const [displayedArticle, setDisplayedArticle] = useState<Article | null>(null); // Store the first article
  const [loadingArticle, setLoadingArticle] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  
  // Fetch the article based on the ID from the URL
  useEffect(() => {
    if (id) {
      fetchArticle(id as string);
    }
  }, [id]);

  // // Get unmoderated articles when the page loads
  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  // Fetch a specific article by ID
  const fetchArticle = async (articleId: string) => {
    try {
      setLoadingArticle(true);
      const response = await fetch(`http://localhost:8082/articles/${articleId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const articleData: Article = await response.json(); 
      if (articleData && articleData.status === 'Unmoderated') {
        setDisplayedArticle(articleData); // Store the article
      } else {
        alert('This article is not available for moderation.');
        router.push('/'); // Redirect if not unmoderated
      }
    } catch (error) {
      console.error('Failed to fetch article:', error);
    } finally {
      setLoadingArticle(false);
    }
  };

  // // Fetch unmoderated articles
  // const fetchArticles = async () => {
  //   try {
  //     setLoadingArticle(true);
  //     const port = 8082; // !! should use port from .env
  //     const response = await fetch(`http://localhost:${port}/articles/status/unmoderated`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
      
  //     const articleData: Article[] = await response.json(); // Use the Article type for the data
  //     setArticles(articleData); // Store the article

  //     // Set displayedArticle to the first article if the array has at least one article
  //     if (articleData.length > 0) {
  //       setDisplayedArticle(articleData[0]);
  //     } else {
  //       setDisplayedArticle(null); // No articles to display
  //     }

  //   } catch (error) {
  //     console.error('Failed to fetch article:', error); 
  //   }  finally {
  //     setLoadingArticle(false);
  //   }
  // };

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
        // !! change this
        router.push('/'); // Redirect after successful moderation
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

  // // Modify article state so it becomes 'Rejected'
  // const onReject = async () => {
  //   setLoadingSubmit(true);

  //   console.log("Rejecting article..");

  //   try {
  //     const response = await fetch(`http://localhost:8082/articles/${displayedArticle._id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...displayedArticle,
  //         status: 'Rejected', // Update the status
  //       }),
  //     });

  //     if (response.ok) {
  //       console.log('Article updated successfully');
  //       await fetchArticles(); // Refetch the next article
  //     } else {
  //       console.error('Failed to update article');
  //     }
  //   } catch (error) {
  //     console.error('Error updating article:', error);
  //   } finally {
  //     setLoadingSubmit(false);
  //   }
  // };

  
  if (loadingArticle) {
    return <p>Loading...</p>; // Show loading state while fetching
  }

  if (!displayedArticle) {
    return <p>No article found.</p>; // Show message if no article is found
  }

  return (
    <>
      <p>Moderation Page</p>

      <br />

      <div>
        <h1>{displayedArticle.title}</h1>
        <h3>{displayedArticle.authors}</h3>
        <h3>{displayedArticle.source}, {displayedArticle.publicationYear}</h3>
        <h3>
          <a href={displayedArticle.doi} target="_blank" rel="noopener noreferrer">{displayedArticle.doi}</a>
        </h3>
        <h4>Article ID: {displayedArticle._id}</h4>
      </div>

      <br />

      <div className="flex space-x-4">
        <button 
          onClick={onReject}
          // !! Disabled button style is pretty ugly
          className={`px-4 py-2 font-semibold rounded ${
            loadingSubmit
              ? 'bg-red-300 text-red-700 cursor-not-allowed'  // Disabled styles
              : 'bg-red-500 text-white hover:bg-red-600'      // Active styles
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
              : 'bg-blue-500 text-white hover:bg-blue-600'      // Active styles
          }`}
          disabled={loadingSubmit}
        >
          Submit for Analysis
        </button>
      </div>

    </>
  ) 

};

export default ModerateArticlePage;