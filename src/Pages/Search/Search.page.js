import {useState, useEffect} from 'react';
import { useQuery, useMutation } from "react-query";
import Spinner from '../../Components/Spinner/Spinner';
import SearchInput from '../../Components/SearchInput/SearchInput';
import Book from '../../Components/BookCard/BookCard';
import BooksApi from '../../Services/books.service';

import './searchPage.styles.css'

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [myBooksMap, setMyBooksMap] = useState({})

  useEffect(() => {
    if(searchValue) mutateSearch(searchValue);
    else setBooks([])
  }, [searchValue]);


  useQuery('my-books', BooksApi.getAll, {
    cacheTime: 30 * 60 * 1000,
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: ({data}) => {
      const mappedBooks = mapBooks(data.books);
      setMyBooksMap(mappedBooks);
    }
  });


  const {isLoading, mutate: mutateSearch} = useMutation(BooksApi.search, {
    onSuccess: ({data: {books}}) => {
      if(Array.isArray(books)) {
        const updatedBooks = books.map(book => ({...book, shelf: myBooksMap[book.id]}));
        setBooks(updatedBooks);
      } else {
        setBooks([])
      }
    },
    onError: (err) => {
      console.log("error: ", err);
    },
  })

  const {mutate: mutateShelf} = useMutation(BooksApi.update, {
    onSuccess: ({data}) => {
      const dataDict = {};
      Object.keys(data).forEach(key => {
        data[key].forEach(id => dataDict[id] = key)
      });
      const updatedBooks = books.map(book => ({...book, shelf: dataDict[book.id]}));
      setBooks(updatedBooks)
      setIsUpdateLoading(false)
    },
    onError: (err) => {
      console.log("error: ", err);
      setIsUpdateLoading(false)
    },
  })

  const mapBooks = (booksArr=[]) => {
    const booksMap = {};
    booksArr.forEach(({id, shelf}) => {
      booksMap[id]=shelf;
    })
    return booksMap;
  }
  const handleSearchChange = (event) => {
    const {value} = event.target;
    setSearchValue(value);
  }
  const handleChangeShelf = (bookId, shelf) => {
    setIsUpdateLoading(true)
    mutateShelf({bookId, shelf});
  }
  return ( 
    <div className="page-container">
      <SearchInput backPath="/" placeholder="Enter Book Name" value={searchValue} onChange={handleSearchChange}/>
      {isLoading || isUpdateLoading ?
        <div className="spinner-container">
          <Spinner type="Oval" color="#f57f1a" height={100} width={100} />
        </div>
        : 
        <>
          <div className="books-container">
            {books.length === 0 && <div>There are no books found.</div>}
            {books?.map(({id, title, authors, shelf, imageLinks}) => (
              <div className="book-container" key={id}>
                <Book 
                  {...{
                    id,
                    title,
                    authors,
                    shelf,
                    cover: imageLinks?.thumbnail,
                    onShelfChange:handleChangeShelf
                  }}
                />
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
}
 
export default SearchPage;