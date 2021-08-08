import Book from '../BookCard/BookCard';
import './shelf.styles.css';

const colorsMap = {
  currentlyReading: {
    titleBg:"primary-bgcolor-dark",
    titleColor: "primary-color-dark",
    borderColor: "primary-border-color-dark",
    bgColor:"primary-bgcolor-xlight"
  },
  wantToRead: {
    titleBg:"secodary-bgcolor-dark",
    titleColor: "secodary-color-dark",
    borderColor: "secodary-border-color-dark",
    bgColor:"secodary-bgcolor-xlight"
  },
  read: {
    titleBg:"secodary-bgcolor-light",
    titleColor: "secodary-color-light",
    borderColor: "secodary-border-color-light",
    bgColor:"secodary-bgcolor-xxlight"
  }
}
const Shelf = ({tag, label, books=[], onShelfChange}) => {
  const {titleBg, titleColor, borderColor, bgColor} = colorsMap[tag];
  return ( 
    <div className={`shelf-container ${borderColor} ${bgColor}`}>
      <div className={`shelf-title ${titleBg}`}>
        {label}
        <div className={`shelf-count ${titleColor}`}>{books.length}</div>
      </div>
      {books.length === 0 && <div>Sorry There are no books in this shelf...</div>}
      {books?.map(({id, title, authors, shelf, imageLinks}) => (
          <div className="shelf-book-container" key={id}>
            <Book 
              {...{
                id,
                title,
                authors,
                shelf,
                cover: imageLinks?.thumbnail,
                onShelfChange
              }}
            />
          </div>
        ))}
    </div>
  );
}
 
export default Shelf;