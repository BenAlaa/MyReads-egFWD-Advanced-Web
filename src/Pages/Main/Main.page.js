import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import {Link} from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import Shelf from '../../Components/Shelf/Shelf'
import BookApis from '../../Services/books.service';
import './main.styles.css';


const shelfLabelsMap = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want To Read",
  read: "Read"
}

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: []
  })

  useEffect(() => {
    filterBooks(books);
  }, [books]);
  const { isLoading, isFetching, refetch } = useQuery('my-books', BookApis.getAll, {
    cacheTime: 30 * 60 * 1000,
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: ({data}) => {
      setBooks(data.books);
    }
  });

  const {isLoading: isMutatLoading, mutate} = useMutation(BookApis.update, {
    onSuccess: ({data}) => {
      refetch();
    },
    onError: (err) => {
      console.log("error: ", err);
    },
  })

  const handleChangeShelf = (bookId, shelf) => {
    mutate({bookId, shelf});
  }
  const filterBooks = (booksArr) => {
    let updatedFilterdBooks = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
    booksArr.forEach((book) => {
      updatedFilterdBooks[book.shelf].push(book)
    });
    setFilteredBooks(updatedFilterdBooks)
  }
  if(isLoading || isFetching || isMutatLoading) return (
    <div className="spinner-container">
      <Spinner type="Oval" color="#f57f1a" height={100} width={100} />
    </div>
  )
  return ( 
    <div className="page-container">
      <div className="books-container">
        {Object.keys(filteredBooks).map((shelfTag, index) => (
          <Shelf 
            key={index}
            tag={shelfTag}
            books={filteredBooks[shelfTag]}
            label={shelfLabelsMap[shelfTag]}
            onShelfChange={handleChangeShelf}
          />
        ) )}
      </div>
      <Link to="/search" className="add-book-link secodary-bgcolor-medium">+</Link>
    </div>
  );
}
 
export default MainPage;