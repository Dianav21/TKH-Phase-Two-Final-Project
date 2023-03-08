import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SpecificBooks = () => {
  let params = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const allBooks = await axios.get(`http://localhost:8080/books/${params.id}`);
        // console.log(allBooks);
        if (allBooks.status === 200) {
          setBooks(allBooks.data.getBook);
        } else {
          return null;
        }
      } catch (error) {
        console.log("Oh no, something went wrong", error);
        setError(true)
      }
    };

    fetchBooks();

    return () => {
    };
  }, [params]);

  const deleteBook = async () => {
    // console.log(data);
    try {
        const token = localStorage.getItem("token")
        console.log(token)
        const res = await axios.delete(`http://localhost:8080/books/${params.id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
               },
        }
       
        );


      navigate("/viewbooks")
  } catch(error) {
    setError(true);
  }
}

  console.log(books)
  return (
    <div>
      <h1>{books.title}</h1>
      <Link to={`editbook/${params.id}`}>Edit Book</Link>
      <button onClick={deleteBook}>Delete Book</button>
    </div>
  )
}

export default SpecificBooks;
