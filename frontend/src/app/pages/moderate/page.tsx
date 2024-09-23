// 'use client';

// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router';

// // !! should use same article interface across pages?
// interface Article {
//   _id: string;
//   title: string;
//   authors: string;
//   source: string;
//   publicationYear: string;
//   doi: string;
//   rating: number;
//   status: string;
// }

// const ModeratePage = () => {
  
//   const router = useRouter();
//   const { id } = router.query; // Get the article ID from the URL
//   // const [articles, setArticles] = useState<Article[] | null>(null);
//   const [displayedArticle, setDisplayedArticle] = useState<Article | null>(null); // Store the first article
//   const [loadingArticle, setLoadingArticle] = useState<boolean>(true);
//   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  
//   // Fetch the article based on the ID from the URL
//   useEffect(() => {
//     if (id) {
//       fetchArticle(id as string);
//     }
//   }, [id]);

//   // // Get unmoderated articles when the page loads
//   // useEffect(() => {
//   //   fetchArticles();
//   // }, []);

//   // Fetch a specific article by ID
//   const fetchArticle = async (articleId: string) => {
//     try {
//       setLoadingArticle(true);
//       const response = await fetch(`http://localhost:8082/articles/${articleId}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       const articleData: Article = await response.json(); 
//       if (articleData && articleData.status === 'Unmoderated') {
//         setDisplayedArticle(articleData); // Store the article
//       } else {
//         alert('This article is not available for moderation.');
//         router.push('/'); // Redirect if not unmoderated
//       }
//     } catch (error) {
//       console.error('Failed to fetch article:', error);
//     } finally {
//       setLoadingArticle(false);
//     }
//   };

//   // // Fetch unmoderated articles
//   // const fetchArticles = async () => {
//   //   try {
//   //     setLoadingArticle(true);
//   //     const port = 8082; // !! should use port from .env
//   //     const response = await fetch(`http://localhost:${port}/articles/status/unmoderated`);
//   //     if (!response.ok) {
//   //       throw new Error('Network response was not ok');
//   //     }
      
//   //     const articleData: Article[] = await response.json(); // Use the Article type for the data
//   //     setArticles(articleData); // Store the article

//   //     // Set displayedArticle to the first article if the array has at least one article
//   //     if (articleData.length > 0) {
//   //       setDisplayedArticle(articleData[0]);
//   //     } else {
//   //       setDisplayedArticle(null); // No articles to display
//   //     }

//   //   } catch (error) {
//   //     console.error('Failed to fetch article:', error); 
//   //   }  finally {
//   //     setLoadingArticle(false);
//   //   }
//   // };

//   // Modify article state to 'Moderated'
//   const onSubmit = async () => {
//     setLoadingSubmit(true);
//     try {
//       const response = await fetch(`http://localhost:8082/articles/${displayedArticle!._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...displayedArticle,
//           status: 'Moderated', // Update the status
//         }),
//       });

//       if (response.ok) {
//         console.log('Article updated successfully');
//         // !! change this
//         router.push('/'); // Redirect after successful moderation
//       } else {
//         console.error('Failed to update article');
//       }
//     } catch (error) {
//       console.error('Error updating article:', error);
//     } finally {
//       setLoadingSubmit(false);
//     }
//   };

//   // Modify article state to 'Rejected'
//   const onReject = async () => {
//     setLoadingSubmit(true);
//     try {
//       const response = await fetch(`http://localhost:8082/articles/${displayedArticle!._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...displayedArticle,
//           status: 'Rejected', // Update the status
//         }),
//       });

//       if (response.ok) {
//         console.log('Article updated successfully');
//         router.push('/'); // Redirect after rejection
//       } else {
//         console.error('Failed to update article');
//       }
//     } catch (error) {
//       console.error('Error updating article:', error);
//     } finally {
//       setLoadingSubmit(false);
//     }
//   };

//   // // Modify article state so it becomes 'Rejected'
//   // const onReject = async () => {
//   //   setLoadingSubmit(true);

//   //   console.log("Rejecting article..");

//   //   try {
//   //     const response = await fetch(`http://localhost:8082/articles/${displayedArticle._id}`, {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         ...displayedArticle,
//   //         status: 'Rejected', // Update the status
//   //       }),
//   //     });

//   //     if (response.ok) {
//   //       console.log('Article updated successfully');
//   //       await fetchArticles(); // Refetch the next article
//   //     } else {
//   //       console.error('Failed to update article');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating article:', error);
//   //   } finally {
//   //     setLoadingSubmit(false);
//   //   }
//   // };

  
//   if (loadingArticle) {
//     return <p>Loading...</p>; // Show loading state while fetching
//   }

//   if (!displayedArticle) {
//     return <p>No article found.</p>; // Show message if no article is found
//   }

//   return (
//     <>
//       <p>Moderation Page</p>

//       <br />

//       <div>
//         <h1>{displayedArticle.title}</h1>
//         <h3>{displayedArticle.authors}</h3>
//         <h3>{displayedArticle.source}, {displayedArticle.publicationYear}</h3>
//         <h3>
//           <a href={displayedArticle.doi} target="_blank" rel="noopener noreferrer">{displayedArticle.doi}</a>
//         </h3>
//         <h4>Article ID: {displayedArticle._id}</h4>
//       </div>

//       <br />

//       <div className="flex space-x-4">
//         <button 
//           onClick={onReject}
//           // !! Disabled button style is pretty ugly
//           className={`px-4 py-2 font-semibold rounded ${
//             loadingSubmit
//               ? 'bg-red-300 text-red-700 cursor-not-allowed'  // Disabled styles
//               : 'bg-red-500 text-white hover:bg-red-600'      // Active styles
//           }`}
//           disabled={loadingSubmit}
//         >
//           Reject
//         </button>
//         <button 
//           onClick={onSubmit}
//           className={`px-4 py-2 font-semibold rounded ${
//             loadingSubmit
//               ? 'bg-blue-300 text-blue-700 cursor-not-allowed'  // Disabled styles
//               : 'bg-blue-500 text-white hover:bg-blue-600'      // Active styles
//           }`}
//           disabled={loadingSubmit}
//         >
//           Submit for Analysis
//         </button>
//       </div>

//     </>
//   ) 

// };

// export default ModeratePage;

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

const BrowsePage = () => {
  const [articles, setArticles] = useState<Article[]>([]); 

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8082/articles/status/unmoderated');
        const data = await response.json();

        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error('Unexpected API response:', data);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="mt-16">
      <div className="flex justify-center items-center space-x-4 xl:w-3/4 mx-auto">
        <span className="font-bold text-xl flex-shrink-0 whitespace-nowrap">
          Browse unmoderated articles
        </span>
      </div>

      <div className="mt-16">
        <div className="px-4 md:px-8">
          <table className="min-w-full table-auto border border-blue-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left font-bold">Title</th>
                <th className="border px-4 py-2 text-left font-bold">Authors</th>
                <th className="border px-4 py-2 text-left font-bold">Source</th>
                <th className="border px-4 py-2 text-left font-bold">Year</th>
                <th className="border px-4 py-2 text-left font-bold">DOI</th>
                <th className="border px-4 py-2 text-left font-bold">Claim</th>
                <th className="border px-4 py-2 text-left font-bold">Evidence</th>
                <th className="border px-4 py-2 text-left font-bold">Rating</th>
                <th className="border px-4 py-2 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Render the article rows based on search results */}
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr key={article._id}>
                    <td className="border px-4 py-2">
                      <Link href={`/pages/moderate/${article._id}`} className="text-blue-600 hover:underline">
                        {article.title}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">{article.authors.join(', ')}</td>
                    <td className="border px-4 py-2">{article.source}</td>
                    <td className="border px-4 py-2">{article.publicationYear}</td>
                    <td className="border px-4 py-2">{article.doi}</td>
                    <td className="border px-4 py-2">{article.claim || 'N/A'}</td>
                    <td className="border px-4 py-2">{article.evidence || 'N/A'}</td>
                    <td className="border px-4 py-2">{article.rating}/5</td>
                    <td className="border px-4 py-2">{article.status || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">No articles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;