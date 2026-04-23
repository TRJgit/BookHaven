import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  
  // New Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // How many books to show per page

  useEffect(() => {
    setLoading(true);
    // Append page and limit to the request URL
    axios
      .get(`http://localhost:5555/books?page=${page}&limit=${limit}`)
      .then((response) => {
        setBooks(response.data.data);
        setTotalPages(response.data.totalPages); // Update total pages from backend
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [page]); // Add 'page' to the dependency array so it refetches when the page changes

  // Handlers for pagination buttons
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className='flex justify-center items-center gap-x-4 mt-8'>
          <button 
            onClick={handlePrevious} 
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-gray-300' : 'bg-sky-400 hover:bg-sky-600 text-white'}`}
          >
            Previous
          </button>
          
          <span className='text-lg'>
            Page {page} of {totalPages}
          </span>
          
          <button 
            onClick={handleNext} 
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg ${page === totalPages ? 'bg-gray-300' : 'bg-sky-400 hover:bg-sky-600 text-white'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;